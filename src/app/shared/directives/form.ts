import { Directive, HostListener, inject, output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TransactionRequestModel } from '../../core/models';
import { TransactionStore } from '../../features/transactions/store/transaction.store';
import { ToastService } from '../../core/Services';

@Directive({
  selector: 'form[appForm]',
})
export class FormDirective {
  private readonly ngForm = inject(NgForm);
  public readonly formValue = output<any>();
  public readonly formSubmit = output<any>();
  protected readonly store = inject(TransactionStore);
  private readonly toast = inject(ToastService);

  constructor() {
    this.ngForm.valueChanges?.subscribe((v) => this.formValue.emit(v));
  }

  @HostListener('submit', ['$event'])
  SubmitForm(event: Event) {
    this.ngForm.form.markAllAsTouched();

    if (this.ngForm.valid) {
      this.formSubmit.emit(this.ngForm.value);
    }
  }
}
