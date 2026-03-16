import { AccountResponseModel, TransactionModel } from '@/app/core/models';
import { ButtonComponent } from '@/app/shared';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TransactionStore } from '../../store/transaction.store';
import { ToastService } from '@/app/shared/toast.service';
import { AccountStore } from '@/app/core/store';

@Component({
  selector: 'app-edit-transaction',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './edit-transaction.component.html',
})
export class EditTransactionComponent {
  protected readonly transactionRefresher = output<void>();
  protected readonly store = inject(TransactionStore);
  protected readonly toast = inject(ToastService);
  protected readonly accountStore = inject(AccountStore);
  public readonly accountList = input.required<AccountResponseModel[]>();
  public readonly transaction = input.required<TransactionModel | null>();

  protected readonly hasError = signal(false);
  protected readonly isLoading = signal(false);

  protected readonly occurredAt = signal<Date>(new Date());
  protected readonly amount = signal<number>(0);
  protected readonly reference = signal<string>('');
  protected readonly description = signal<string>('');
  protected readonly budget = signal<number | null>(null);
  protected readonly category = signal<number | null>(null);
  protected readonly account = signal<string>('')

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
        this.account.set(tx.accountId)
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
      accountId: this.account(),
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
