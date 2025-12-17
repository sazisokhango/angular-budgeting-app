import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { TransactionModel } from '../model/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  transactionService = inject(TransactionService);

  transactions = signal<TransactionModel[]>([]);

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => this.transactions.set(data.slice(0, 5)),
      error: (error) => console.log(error),
    });
  }
}
