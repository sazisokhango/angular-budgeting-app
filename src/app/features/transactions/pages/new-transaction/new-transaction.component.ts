import { Component, inject, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TransactionRequestModel } from '@/app/core/models';
import { ButtonComponent } from '@/app/shared';
import { TransactionStore } from '../../store/transaction.store';
import { ToastService } from '@/app/core/Services';

@Component({
  selector: 'app-new-transaction',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './new-transaction.component.html',
})
export class NewTransactionComponent {
  public readonly transactionRefresher = output<void>();

  protected readonly store = inject(TransactionStore);
  private readonly toast = inject(ToastService);

  protected readonly hasError = signal(false);
  public readonly isLoading = signal(false);
  public readonly occurredAt = signal<Date | null>(new Date());
  public readonly amount = signal<number>(0);
  public readonly reference = signal<string>('');
  public readonly description = signal<string>('');
  public readonly budget = signal<number | null>(null);
  public readonly category = signal<number | null>(null);

  onSubmitTransaction(form: NgForm) {
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

    const transaction: TransactionRequestModel = {
      amount: this.amount(),
      reference: this.reference(),
      occurredAt: this.occurredAt(),
      description: this.description(),
      category,
      budget,
    };

    this.store.createTransaction(transaction).subscribe({
      next: () => {
        this.transactionRefresher.emit();
        form.resetForm();
        this.hasError.set(false);
        this.toast.add('Transaction created Successfully', 'success', 4000);
      },
      error: () => {
        this.isLoading.set(false);
        this.hasError.set(true);
      },
    });
  }
}
