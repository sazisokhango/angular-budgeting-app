import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, of, tap, throwError } from 'rxjs';
import { TransactionService } from '../services';
import { TransactionModel, TransactionRequestModel } from '@/app/core/models';
import { ToastService } from '@/app/shared/toast.service';

@Injectable({
  providedIn: 'root',
})
export class TransactionStore {
  private readonly service = inject(TransactionService);
  private readonly toastService = inject(ToastService);
  private readonly selectedAccountId = signal<string | null>(null);

  public setAccount(accountId: string) {
    this.selectedAccountId.set(accountId);
  }

  readonly transactions = rxResource({
    stream: () =>
      this.service.getTransactions().pipe(
        catchError((error) => {
          this.toastService.add('Error fetching the Transactions', 'error', 3000);
          return EMPTY;
        })
      ),
  });

  readonly transactionsByAccount = rxResource({
    stream: () => {
      const id = this.selectedAccountId();
      if (!id) {
        return of([]);
      }
  
      return this.service.getTransactionsByAccount(id).pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of([]);
          }
          this.toastService.add('Error fetching the Transaction', 'error', 3000);
          return EMPTY;
        })
      );
    },
    defaultValue: [],
  });

  readonly categories = rxResource({
    stream: () =>
      this.service.getCategories().pipe(
        catchError((error) => {
          console.error(error);
          this.toastService.add('Error fetching the Categories', 'error', 3000);
          return EMPTY;
        })
      ),
    defaultValue: [],
  });

  readonly budgets = rxResource({
    stream: () =>
      this.service.getBudgets().pipe(
        catchError((error) => {
          console.log(error), this.toastService.add('Error fetching the Budget', 'error', 3000);
          return EMPTY;
        })
      ),
    defaultValue: [],
  });

  createTransaction(request: Readonly<TransactionRequestModel>) {
    return this.service.createTransaction(request).pipe(
      this.reloadAfter(),
      catchError((error) => {
        this.toastService.add('Error creating Transaction', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  editTransaction(body: Readonly<TransactionModel>) {
    return this.service.updateTransaction(body).pipe(
      this.reloadAfter(),
      catchError((error) => {
        this.toastService.add('Error updating the Transaction', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  deleteTransaction(id: Readonly<string>) {
    return this.service.deleteTransaction(id).pipe(
      this.reloadAfter(),
      catchError((error) => {
        this.toastService.add('Error deleting the Transaction', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  readonly dashboardSummary = rxResource({
    stream: () =>
      this.service.getTransactionSummary().pipe(
        catchError((error) => {
          this.toastService.add('Error fetching the transaction summary', 'error', 3000);
          return EMPTY;
        })
      ),
  });

  readonly monthlySummary = rxResource({
    stream: () =>
      this.service.getMonthlySummary().pipe(
        catchError((error) => {
          this.toastService.add('Error fetching the monthly transaction summary', 'error', 3000);
          return EMPTY;
        })
      ),
  });

  private reloadAfter() {
    return tap(() => this.reload());
  }

  private reload() {
    this.transactions.reload();
    this.dashboardSummary.reload();
    this.monthlySummary.reload();
    this.transactionsByAccount.reload()
  }
}
