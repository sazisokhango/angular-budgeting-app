import { Component, inject, OnInit, signal } from '@angular/core';
import { TransactionModel } from '../model/transaction.model';
import { TransactionService } from '../service/transaction.service';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [TransactionTableComponent],
})
export class HomeComponent implements OnInit {
  transactionService = inject(TransactionService);
  toastService = inject(ToastService);

  transactions = signal<TransactionModel[]>([]);

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (data) => {
        this.transactions.set(
          data
            .sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            })
            .slice(0, 5)
        );
      },
      error: (error) => {
        console.log(error), this.toastService.showError('Error creating Transaction');
      },
    });
  }
}
