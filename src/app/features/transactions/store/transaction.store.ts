import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap, throwError } from 'rxjs';
import { TransactionService } from '../services';
import { ToastService } from '@/app/core/Services';
import { TransactionModel, TransactionRequestModel } from '@/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class TransactionStore {
  private readonly service = inject(TransactionService);
  private readonly toastService = inject(ToastService);

  readonly transactions = rxResource({
    stream: () =>
      this.service.getTransactions().pipe(
        catchError((error) => {
          this.toastService.add('Error fetching the Transactions', 'error', 3000);
          return EMPTY;
        })
      ),
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
      tap(() => {
        this.transactions.reload();
        this.dashboardSummary.reload();
      }),
      catchError((error) => {
        this.toastService.add('Error creating Transaction', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  editTransaction(body: Readonly<TransactionModel>) {
    return this.service.updateTransaction(body).pipe(
      tap(() => {
        this.transactions.reload();
        this.dashboardSummary.reload();
      }),
      catchError((error) => {
        this.toastService.add('Error updating the Transaction', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  deleteTransaction(id: Readonly<string>) {
    return this.service.deleteTransaction(id).pipe(
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
}
