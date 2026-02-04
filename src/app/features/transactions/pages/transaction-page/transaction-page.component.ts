import { Component, inject, signal } from '@angular/core';
import { NewTransactionComponent, TransactionTableComponent } from '@/app/features/transactions';
import { Drawer, ConfirmDialogComponent } from '@/app/shared';
import { TransactionStore } from '@/app/core/store/transaction.store';
import { TransactionModel } from '@/app/core/models';
import { EditTransactionCompoent } from '../edit-transaction/edit-transaction.component';
import { ToastService } from '@/app/core/service';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transaction-page.component.html',
  styleUrl: './transaction-page.component.css',
  imports: [
    TransactionTableComponent,
    NewTransactionComponent,
    Drawer,
    EditTransactionCompoent,
    ConfirmDialogComponent,
  ],
})
export class TransactionsComponent {
  protected readonly store = inject(TransactionStore);

  protected readonly selectedTransaction = signal<TransactionModel | null>(null);
  protected readonly isDeleteConfirmed = signal(false);
  protected readonly showConfirmation = signal(false);
  protected readonly toast = inject(ToastService);
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

  openConfirmation() {
    this.showConfirmation.update((t) => !t);
  }

  requestTractionEditPage(transaction: TransactionModel) {
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
    this.showConfirmation.update((t) => (t = false));

    if (isToBeDeleted) {
      // this.isLoading.set(true);
      const id = this.selectedTransaction()?.transactionId!;
      if (id !== null) {
        this.store.deleteTransaction(id).subscribe({
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
}
