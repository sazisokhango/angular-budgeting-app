import { Component, computed, inject, signal } from '@angular/core';
import { TransactionTableComponent } from '@/app/features/transactions';
import { TransactionModel } from '@/app/core/models';
import { ChartComponent } from '@/app/shared';
import { TransactionStore } from '../transactions/store/transaction.store';
import { SpendByMonthModel } from '@/app/core/models/spendByMonth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [TransactionTableComponent, ChartComponent],
})
export class HomeComponent {
  protected spendByMonthData = signal<SpendByMonthModel[]>([]);
  protected readonly store = inject(TransactionStore);

  protected readonly transactionList = computed<TransactionModel[]>(
    () => this.store.transactions.value() ?? []
  );

  protected readonly summary = computed(() => {
    return this.store.dashboardSummary.value();
  });

  protected readonly monthlySummary = computed(() => {
    return this.store.monthlySummary.value() ?? [];
  });

  protected get sortedList() {
    return this.transactionList()
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 5);
  }

  protected readonly spendByCategoryLabels = computed(() => {
    return this.store.dashboardSummary.value()?.spendByCategory.map((l) => l.name) ?? [];
  });

  protected readonly incomeVsExpenseLabels = computed(() => {
    return this.store.monthlySummary.value()?.map((l) => l.month) ?? [];
  });

  protected readonly spendByCategoryValues = computed(() => {
    return this.store.dashboardSummary.value()?.spendByCategory.map((v) => v.total) ?? [];
  });

  protected chartTotals() {
    return this.summary()?.spendByCategory.map((t) => t.total);
  }

  get incomeVsExpenseChartData() {
    return [
      {
        label: 'Income',
        data: this.monthlySummary().map((d) => d.income),
        backgroundColor: '#4ade80',
      },
      {
        label: 'Expense',
        data: this.monthlySummary().map((d) => d.expense),
        backgroundColor: '#f87171',
      },
    ];
  }

  get groupByCategoryData() {
    return [{ label: 'Spending', data: this.spendByCategoryValues() }];
  }
}
