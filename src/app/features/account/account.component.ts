import { AccountRequestModel } from '@/app/core/models';
import { AccountStore } from '@/app/core/store';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from "@/app/shared";
import { FormDirective } from '@/app/shared/directives/form';
import { ToastService } from '@/app/shared/toast.service';

@Component({
  selector: 'app-account',
  imports: [ButtonComponent, FormsModule, FormDirective],
  templateUrl: './account.component.html',
})
export class AccountAccount {
  protected isLoading = signal(false);
  private readonly toastService = inject(ToastService);
  private readonly store = inject(AccountStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly formValue = signal<any>({});

  onSubmitAccount(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);
    const newAccount: AccountRequestModel = {
      ...form.form.value,
    };

    this.store.createAccount(newAccount).subscribe({
      next: () => {
        this.toastService.add('Account created successfully', 'success', 3000);
        this.router.navigate(['/home']);
      },
      complete: () => this.isLoading.set(false),
    });
  }
}
