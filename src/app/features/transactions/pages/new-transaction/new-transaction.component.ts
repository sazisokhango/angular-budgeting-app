import { Component, inject, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TransactionRequestModel } from '@/app/core/models';
import { TransactionStore } from '../../../../core/store/transaction.store';
import { ToastService } from '../../../../core/service';

@Component({
  selector: 'app-new-transaction',
  imports: [FormsModule],
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent {
  //Todo ReadOnly and protected
  protected readonly transactionRefresher = output<void>();

  protected readonly store = inject(TransactionStore);
  private readonly toast = inject(ToastService);

  protected readonly hasError = signal(false);
  protected readonly isLoading = signal(false);
  protected readonly occurredAt = signal<Date>(new Date());
  protected readonly amount = signal<number>(0);
  protected readonly reference = signal<string>('');
  protected readonly description = signal<string>('');
  protected readonly budget = signal<number | null>(null);
  protected readonly category = signal<number | null>(null);

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
        this.store.transactions.reload();
        this.transactionRefresher.emit();
        form.resetForm();
        this.isLoading.set(true);
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
