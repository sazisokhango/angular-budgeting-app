import { Component, inject, signal } from '@angular/core';
import { TransactionModel } from '@/app/core/models';
import { ToastService, TransactionService } from '@/app/core/service';
import { NewTransactionComponent, TransactionTableComponent } from '@/app/features/transactions';
import { Drawer } from 'src/app/shared/components/drawer/drawer.component';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css',
  imports: [TransactionTableComponent, NewTransactionComponent, Drawer],
})
export class TransactionsComponent {
  private readonly transactionService = inject(TransactionService);
  private readonly toastService = inject(ToastService);

  protected hasError = signal(false);
  protected isDrawerOpen = signal(false);

  readonly transactions = rxResource<TransactionModel[], void>({
    stream: () =>
      this.transactionService.getTransactions().pipe(
        catchError((error) => {
          console.log(error), this.toastService.add('Error fetching the Transactions', 'error', 3000);
          this.hasError.set(true)
          return of([] as TransactionModel[]);
        })
      ),
  });

  refreshTransaction() {
    this.transactions.reload();
    this.onClose();
  }

  onOpen() {
    this.isDrawerOpen.update((v) => !v);
  }

  onClose() {
    this.isDrawerOpen.set(false);
  }
}
