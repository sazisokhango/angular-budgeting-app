import { inject, Injectable } from '@angular/core';
import { ToastService, TransactionService } from '@/app/core/service';
import { rxResource } from '@angular/core/rxjs-interop';
import { TransactionRequestModel } from '../models';
import { catchError, NEVER } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionStore {
  private readonly service = inject(TransactionService);
  toastService = inject(ToastService);

  readonly transactions = rxResource({
    stream: () => this.service.getTransactions().pipe(
      catchError(error => {
        this.toastService.add('Error fetching the Transactions', 'error', 3000);
        return NEVER;
      })
    )
  });

  readonly categories = rxResource({
    stream: () =>
      this.service.getCategories().pipe(
        catchError((error) => {
          console.error(error);
          this.toastService.add('Error fetching the Categories', 'error', 3000);
          return NEVER;
        })
      ),
  });

  readonly budgets = rxResource({
    stream: () =>
      this.service.getBudgets().pipe(
        catchError((error) => {
          console.log(error), this.toastService.add('Error fetching the Budget', 'error', 3000);
          return NEVER;
        })
      ),
  });

  createTransaction(request: TransactionRequestModel) {
    return this.service.createTransaction(request).pipe(
      catchError(error => {
            this.toastService.add('Error creating Transaction', 'error', 3000);        
            return NEVER;
      })
    )
  }
}
