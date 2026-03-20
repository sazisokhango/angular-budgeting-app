import { inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, of, tap, throwError } from 'rxjs';
import { TransactionService } from '../services';
import { TransactionModel, TransactionRequestModel } from '@/app/core/models';
import { ToastService } from '@/app/shared/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SummaryModel } from '@/app/core/models/summary,model';

@Injectable({
  providedIn: 'root',
})
export class TransactionStore {
  private readonly service = inject(TransactionService);
  private readonly toastService = inject(ToastService);
  private readonly selectedAccountId = signal<string | null>(null);

  public setAccount(accountId: string) {
    this.selectedAccountId.set(accountId);
    this.transactionsByAccount.reload();
    this.dashboardSummary.reload();
    this.monthlySummary.reload();
  }

  readonly transactions = rxResource({
    stream: () =>
      this.service.getTransactions().pipe(
        catchError((error) => {
          this.showErrorMessages('Error fetching the Transactions', 'error', error);
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
          this.showErrorMessages('Error deleting the Transaction', 'error', error);
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
          this.showErrorMessages('Error fetching the Categories', 'error', error);
          return EMPTY;
        })
      ),
    defaultValue: [],
  });

  readonly budgets = rxResource({
    stream: () =>
      this.service.getBudgets().pipe(
        catchError((error) => {
          this.showErrorMessages('Error fetching the Budget', 'error', error);
          return EMPTY;
        })
      ),
    defaultValue: [],
  });

  createTransaction(request: Readonly<TransactionRequestModel>) {
    return this.service.createTransaction(request).pipe(
      this.reloadAfter(),
      catchError((error) => {
        this.showErrorMessages('Error creating Transaction', 'error', error);
        return throwError(() => error);
      })
    );
  }

  editTransaction(body: Readonly<TransactionModel>) {
    return this.service.updateTransaction(body).pipe(
      this.reloadAfter(),
      catchError((error) => {
        this.showErrorMessages('Error updating the Transaction', 'error', error);
        return throwError(() => error);
      })
    );
  }

  deleteTransaction(id: Readonly<string>) {
    return this.service.deleteTransaction(id).pipe(
      this.reloadAfter(),
      catchError((error) => {
        this.showErrorMessages('Error deleting the Transaction', 'error', error);
        return throwError(() => error);
      })
    );
  }

  readonly dashboardSummary = rxResource({
    stream: () => {
      const id = this.selectedAccountId();
      if (!id) {
        return of(null);
      }

      return this.service.getTransactionSummary(id).pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of(null);
          }
          this.showErrorMessages('Error fetching the transaction summary', 'error', error);
          return EMPTY;
        })
      );
    },
    defaultValue: {
      totalIncome: 0,
      totalExpenses: 0,
      netBalance: 0,
      totalTransactions: 0,
      pendingTransactions: 0,
      spendByCategory: [],
    } as SummaryModel,
  });

  readonly monthlySummary = rxResource({
    stream: () => {
      const id = this.selectedAccountId();
      if (!id) {
        return of([]);
      }

      return this.service.getMonthlySummary(id).pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of([]);
          }
          this.showErrorMessages('Error fetching the monthly transaction summary', 'error', error);
          return EMPTY;
        })
      );
    },
    defaultValue: [],
  });

  private showErrorMessages(
    message: string,
    errorType: 'error' | 'success',
    error: HttpErrorResponse,
    duration: number = 3000
  ) {
    if (error.status !== 403) {
      this.toastService.add(message, errorType, duration);
    }
  }

  private reloadAfter() {
    return tap(() => this.reload());
  }

  private reload() {
    this.transactions.reload();
    this.dashboardSummary.reload();
    this.monthlySummary.reload();
    this.transactionsByAccount.reload();
  }
}
