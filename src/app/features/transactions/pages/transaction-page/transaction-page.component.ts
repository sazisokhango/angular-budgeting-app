import { Component, inject, signal } from '@angular/core';

import { ConfirmDialogComponent, Drawer } from '@/app/shared';
import { AccountResponseModel, TransactionModel } from '@/app/core/models';
import { TransactionTableComponent } from '../../components/transaction-table/transaction-table.component';
import { NewTransactionComponent } from '../new-transaction/new-transaction.component';
import { EditTransactionComponent } from '../edit-transaction/edit-transaction.component';
import { TransactionStore } from '../../store/transaction.store';
import { AccountStore } from '@/app/core/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ToastService } from '@/app/shared/toast.service';

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
  protected readonly accountStore = inject(AccountStore);
  protected readonly toast = inject(ToastService);

  public readonly selectedTransaction = signal<TransactionModel | null>(null);
  protected readonly isDeleteConfirmed = signal(false);
  public readonly showConfirmation = signal(false);
  protected transactionsList = signal<TransactionModel[] | null>(null);
  public isDrawerOpen = signal(false);
  protected transactionsInAccount = signal(false);

  protected readonly accounts = toSignal(this.accountStore.getAccounts(), {
    initialValue: [] as AccountResponseModel[],
  });

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
          this.toast.add('The Transaction was successfully deleted', 'success', 4000);
        },
      });
    }
  }

  selectAccount(accountId: string) {
    this.transactionsList.set([])
    this.store.transactionsByCategory(accountId).subscribe({
      next: (data) => {
        this.transactionsList.update(t => t = data);
        this.transactionsInAccount.update(t => t = true)
      },
      error: error => {
        if (error.status === 404) {
          this.transactionsInAccount.update(t => t = false)
        }
      }
    });
  }
}
