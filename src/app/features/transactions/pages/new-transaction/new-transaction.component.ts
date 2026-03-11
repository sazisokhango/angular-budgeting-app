import { Component, inject, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from '@/app/shared';
import { TransactionStore } from '../../store/transaction.store';
import { ToastService } from '@/app/core/Services';
import { FormDirective } from '@/app/shared/directives/form';
import { TransactionRequestModel } from '@/app/core/models';

@Component({
  selector: 'app-new-transaction',
  imports: [FormsModule, ButtonComponent, FormDirective],
  templateUrl: './new-transaction.component.html',
})
export class NewTransactionComponent {
  public readonly transactionRefresher = output<void>();

  protected readonly store = inject(TransactionStore);
  private readonly toast = inject(ToastService);

  protected readonly hasError = signal(false);
  public readonly isLoading = signal(false);

  protected readonly formValue = signal<any>({});

  // constructor() {
  //   effect(() => {
  //     console.log(this.formValue());
  //   });
  // }

  onSubmitTransaction(form: NgForm) {
    this.isLoading.set(true);

    const transaction: TransactionRequestModel = {
      amount: form.form.value.amount,
      reference: form.form.value.reference,
      occurredAt: form.form.value.occurredAt,
      description: form.form.value.description,
      category: form.form.value.category,
      budget: form.form.value.budget,
    };

    this.store.createTransaction(transaction).subscribe({
      next: () => {
        form.resetForm();
        this.transactionRefresher.emit();
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
