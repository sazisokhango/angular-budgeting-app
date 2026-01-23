import { inject, Injectable } from '@angular/core';
import { ToastService, TransactionService } from '../service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TransactionRequestModel } from '../models';
import { catchError, EMPTY, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionStore {
  private readonly service = inject(TransactionService);
  toastService = inject(ToastService);

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
      defaultValue: []
  });

  readonly budgets = rxResource({
    stream: () =>
      this.service.getBudgets().pipe(
        catchError((error) => {
          console.log(error), this.toastService.add('Error fetching the Budget', 'error', 3000);
          return EMPTY;
        })
      ),
      defaultValue: []
  });

  createTransaction(request: TransactionRequestModel) {
    return this.service.createTransaction(request).pipe(
      catchError((error) => {
        this.toastService.add('Error creating Transaction', 'error', 3000);
        return EMPTY;
      })
    );
  }
}
