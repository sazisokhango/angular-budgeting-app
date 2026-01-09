import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { TransactionModel } from '../model/transaction.model';
import { Drawer } from '../shared/drawer/drawer.component';
import { NewTransactionComponent } from './new-transaction.component';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-transactions',
  imports: [TransactionTableComponent, Drawer, NewTransactionComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  transactionService = inject(TransactionService);
  toastService = inject(ToastService);
  isDrawerOpen = signal(false);

  transactions = signal<TransactionModel[]>([]);

  ngOnInit(): void {
    this.refreshTransaction();
  }

  refreshTransaction() {
    this.transactionService.getTransactions().subscribe({
      next: (data) => this.transactions.set(data),
      error: (error) => {
        console.log(error), this.toastService.showError('Error fetching the Transactions');
      },
    });
  }
  onOpen() {
    this.isDrawerOpen.set(!this.isDrawerOpen());
  }
}
