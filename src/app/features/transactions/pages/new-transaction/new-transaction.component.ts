import { Component, inject, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BudgetModel, CategoryModel, TransactionRequestModel } from '@/app/core/models';
import { TransactionStore } from '@/app/core/store/transaction.store';

@Component({
  selector: 'app-new-transaction',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent {
  transactionRefresher = output<void>();

  store = inject(TransactionStore);

  hasError = signal(false);
  isLoading = signal(false);
  occurredAt = signal<Date>(new Date());
  amount = signal<number>(0);
  reference = signal<string>('');
  description = signal<string>('');
  budget = signal<number | null>(null);
  category = signal<number | null>(null);

  onSubmitTransaction(form: NgForm) {
    this.isLoading.set(true);
    const category = this.store.categories
      .value()
      ?.find((category) => (category.id = this.category()!));
    const budget = this.store.budgets.value()?.find((budget) => (budget.id = this.budget()!));
    const transaction: TransactionRequestModel = {
      amount: this.amount(),
      reference: this.reference(),
      occurredAt: this.occurredAt(),
      description: this.description(),
      category: category!,
      budget: budget!,
    };

    this.store.createTransaction(transaction).subscribe({
      next: () => {
        this.store.transactions.reload();
        this.transactionRefresher.emit();
        form.resetForm();
        this.isLoading.set(true);
        this.hasError.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      }
    });
  }
}
