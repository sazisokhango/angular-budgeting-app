import { TransactionModel } from '@/app/core/models';
import { ToastService } from '@/app/core/services';
import { TransactionStore } from '@/app/core/store/transaction.store';
import { ButtonComponent } from '@/app/shared';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-transaction',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './edit-transaction.component.html',
})
export class EditTransactionComponent {
  protected readonly transactionRefresher = output<void>();
  protected readonly store = inject(TransactionStore);
  protected readonly toast = inject(ToastService);
  public readonly transaction = input.required<TransactionModel | null>();

  protected readonly hasError = signal(false);
  protected readonly isLoading = signal(false);

  protected readonly occurredAt = signal<Date>(new Date());
  protected readonly amount = signal<number>(0);
  protected readonly reference = signal<string>('');
  protected readonly description = signal<string>('');
  protected readonly budget = signal<number | null>(null);
  protected readonly category = signal<number | null>(null);

  constructor() {
    effect(() => {
      const tx = this.transaction();
      if (tx) {
        this.amount.set(tx.amount);
        this.occurredAt.set(tx.occurredAt);
        this.reference.set(tx.reference);
        this.description.set(tx.description);
        this.budget.set(tx.budget.id);
        this.category.set(tx.category.id);
      }
    });
  }

  editTransaction(form: NgForm) {
    this.isLoading.set(true);
    const category = this.store.categories.value().find((c) => {
      return c.id === Number(this.category());
    });

    const budget = this.store.budgets.value().find((b) => {
      return b.id === Number(this.budget());
    });

    if (!category || !budget) {
      throw new Error('Category or Budget not found');
    }

    const tx = this.transaction()!;

    const transaction: TransactionModel = {
      transactionId: tx.transactionId,
      amount: this.amount(),
      reference: this.reference(),
      occurredAt: this.occurredAt(),
      description: this.description(),
      category,
      budget,
      createdAt: tx.createdAt,
      createdBy: tx.createdBy,
      updatedAt: tx.updatedAt,
      updatedBy: tx.updatedBy,
    };

    this.store.editTransaction(transaction).subscribe({
      next: () => {
        this.transactionRefresher.emit();
        form.resetForm();
        this.hasError.set(false);
        this.toast.add('Transaction edited Successfully', 'success', 4000);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }
}
