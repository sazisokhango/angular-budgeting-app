import { Component, computed, inject, signal } from '@angular/core';
import { TransactionTableComponent } from '@/app/features/transactions';
import { TransactionStore } from '@/app/core/store/transaction.store';
import { TransactionModel } from '@/app/core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [TransactionTableComponent],
})
export class HomeComponent {
  protected readonly store = inject(TransactionStore);

  protected readonly transactionList = computed<TransactionModel[]>(
    () => this.store.transactions.value() ?? []
  );

  get sortedList() {
    return this.transactionList()
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 5);
  }
}
