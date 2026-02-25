import { Component, computed, inject, signal } from '@angular/core';
import { TransactionTableComponent } from '@/app/features/transactions';
import { TransactionModel } from '@/app/core/models';
import { ChartComponent } from '@/app/shared';
import { TransactionStore } from '../transactions/store/transaction.store';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [TransactionTableComponent, ChartComponent],
})
export class HomeComponent {
  protected readonly store = inject(TransactionStore);

  protected readonly transactionList = computed<TransactionModel[]>(
    () => this.store.transactions.value() ?? []
  );

  protected readonly summary = computed(() => {
    return this.store.dashboardSummary.value();
  });

  protected get sortedList() {
    return this.transactionList()
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 5);
  }

  protected readonly chartLabel = computed(() => {
    return this.store.dashboardSummary.value()?.spendByCategory.map(l => l.name) ?? []
  })

  protected readonly chartValues = computed(() => {
    return this.store.dashboardSummary.value()?.spendByCategory.map(v => v.total) ?? []
  })

  protected chartTotals() {
    return this.summary()?.spendByCategory.map((t) => t.total);
  }
}
