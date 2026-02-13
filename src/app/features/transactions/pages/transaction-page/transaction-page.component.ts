import { Component, inject, signal } from '@angular/core';

import { ConfirmDialogComponent, Drawer } from '@/app/shared';
import { TransactionStore } from '@/app/core/store/transaction.store';
import { TransactionModel } from '@/app/core/models';
import { ToastService } from '@/app/core/service';
import { TransactionTableComponent } from '../../components/transaction-table/transaction-table.component';
import { NewTransactionComponent } from '../new-transaction/new-transaction.component';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transaction-page.component.html',
  standalone: true,
  imports: [
    TransactionTableComponent,
    NewTransactionComponent,
    Drawer,
    EditTransactionComponent,
    ConfirmDialogComponent,
  ],
})
export class TransactionsComponent {
  protected readonly store = inject(TransactionStore);

  public readonly selectedTransaction = signal<TransactionModel | null>(null);
  protected readonly isDeleteConfirmed = signal(false);
  public readonly showConfirmation = signal(false);
  protected readonly toast = inject(ToastService);
  public isDrawerOpen = signal(false);

  public drawerMode: 'new-mode' | 'edit-mode' | 'none' = 'none';

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

  openConfirmation() {
    this.showConfirmation.update((t) => !t);
  }

  requestTransactionEdit(transaction: TransactionModel) {
    this.selectedTransaction.set(transaction);
    this.onOpen();
    this.drawerMode = 'edit-mode';
  }

  requestTransactionDelete(transaction: TransactionModel) {
    this.selectedTransaction.set(transaction);
    this.showConfirmation.set(true);
  }

  checkConfirmation(isToBeDeleted: boolean) {
    this.isDeleteConfirmed.set(isToBeDeleted);
    this.showConfirmation.set(false);

    if (isToBeDeleted) {
      const tx = this.selectedTransaction();

      if (!tx) {
        return;
      }

      this.store.deleteTransaction(tx.transactionId).subscribe({
        next: () => {
          this.store.transactions.reload();
          this.refreshTransaction();
          // this.isLoading.set(true);
          // this.hasError.set(false);
          this.toast.add('The Transaction was successfully deleted', 'success', 4000);
        },
        error: () => {
          // this.isLoading.set(false);
          // this.hasError.set(true);
        },
      });
    }
  }
}
