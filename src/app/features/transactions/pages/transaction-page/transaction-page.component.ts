import { Component, inject, signal } from '@angular/core';
import { NewTransactionComponent, TransactionTableComponent } from '@/app/features/transactions';
import { Drawer } from '@/app/shared';
import { TransactionStore } from '@/app/core/store/transaction.store';
import { TransactionModel } from '@/app/core/models';
import { EditTransactionCompoent } from '../edit-transaction/edit-transaction.component';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css',
  imports: [TransactionTableComponent, NewTransactionComponent, Drawer, EditTransactionCompoent],
})
export class TransactionsComponent {
  protected readonly store = inject(TransactionStore);
  protected readonly selectedTransaction = signal<TransactionModel | null>(null);

  protected isDrawerOpen = signal(false);
  protected drawerMode: 'new-mode' | 'edit-mode' | 'none' = 'none';

  refreshTransaction() {
    this.store.transactions.reload();
    this.onClose();
  }

  requestNewTransaction() {
    this.drawerMode = 'new-mode';
    this.onOpen();
  }

  onOpen() {
    this.isDrawerOpen.update((v) => !v);
  }

  onClose() {
    this.drawerMode = 'none';
    this.isDrawerOpen.set(false);
  }

  requestTractionEditPage(transaction: TransactionModel) {
    this.selectedTransaction.set(transaction);
    this.onOpen();
    this.drawerMode = 'edit-mode';
  }
}
