import { Component, inject, signal } from '@angular/core';
import { NewTransactionComponent, TransactionTableComponent } from '@/app/features/transactions';
import { Drawer } from "@/app/shared";
import { TransactionStore } from '@/app/core/store/transaction.store';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css',
  imports: [TransactionTableComponent, NewTransactionComponent, Drawer],
})
export class TransactionsComponent {
  protected readonly store = inject(TransactionStore);

  protected isDrawerOpen = signal(false);

  refreshTransaction() {
    this.store.transactions.reload();
    this.onClose();
  }

  onOpen() {
    this.isDrawerOpen.update((v) => !v);
  }

  onClose() {
    this.isDrawerOpen.set(false);
  }
}
