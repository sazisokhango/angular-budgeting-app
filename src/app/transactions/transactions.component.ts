import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { TransactionModel } from '../model/transaction.model';

@Component({
  selector: 'app-transactions',
  imports: [ TransactionTableComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  transactionService = inject(TransactionService);

  transactions = signal<TransactionModel[]>([]);

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => this.transactions.set(data),
      error: (error) => console.log(error),
    });
  }
}
