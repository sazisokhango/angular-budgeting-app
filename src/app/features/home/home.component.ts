import { Component, computed, effect, inject, signal } from '@angular/core';
import { TransactionTableComponent } from '@/app/features/transactions';
import { SpendByCategoryModel, TransactionModel } from '@/app/core/models';
import { ChartComponent } from '@/app/shared';
import { TransactionStore } from '../transactions/store/transaction.store';
import { SpendByMonthModel } from '@/app/core/models/spendByMonth.model';
import { AccountStore, AuthStore } from '@/app/core/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [TransactionTableComponent, ChartComponent, CommonModule],
})
export class HomeComponent {
  protected spendByMonthData = signal<SpendByMonthModel[]>([]);
  protected isAccountSelected = signal(false);
  protected readonly accountStore = inject(AccountStore);
  protected readonly store = inject(TransactionStore);
  protected readonly authStore = inject(AuthStore);

  protected readonly transactionList = computed<TransactionModel[]>(
    () => this.store.transactionsByAccount.value() ?? []
  );

  protected readonly summary = computed(() => {
    return this.store.dashboardSummary.value();
  });

  protected readonly monthlySummary = computed(() => {
    return this.store.monthlySummary.value() ?? [];
  });

  constructor() {
    this.accountStore.reloadAccounts();    
  }
  protected get sortedList() {
    return this.transactionList()
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 5);
  }

  protected readonly spendByCategoryLabels = computed(() => {
    return (
      this.store.dashboardSummary
        .value()
        ?.spendByCategory.map((l: SpendByCategoryModel) => l.name) ?? []
    );
  });

  protected readonly incomeVsExpenseLabels = computed(() => {
    return this.store.monthlySummary.value()?.map((l) => l.month) ?? [];
  });

  protected readonly spendByCategoryValues = computed(() => {
    return (
      this.store.dashboardSummary
        .value()
        ?.spendByCategory.map((v: SpendByCategoryModel) => v.total) ?? []
    );
  });

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

  selectAccount(accountId: string) {
    this.isAccountSelected.set(true);
    this.store.setAccount(accountId);
  }
}
