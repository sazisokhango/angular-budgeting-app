import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonComponent } from "@/app/shared";
import { AuthStore } from '@/app/core/store';
import { UserLoginRequest } from '@/app/core/models';
import { FormDirective } from '@/app/shared/directives/form';
import { ToastService } from '@/app/shared/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logn',
  imports: [FormsModule, ButtonComponent, FormDirective],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected readonly isLoading = signal(false);
  protected readonly formValue = signal<any>({});
  protected readonly store = inject(AuthStore);
  protected readonly route = inject(Router)
  protected readonly toastService = inject(ToastService)

  onLoginUser(form: NgForm) {
    this.isLoading.set(true)
    const loginRequest: UserLoginRequest = {
      ...form.form.value
    }

    this.store.login(loginRequest).subscribe({
      next: (data) => {
        this.toastService.add('Login Successful', 'success', 4000);
        localStorage.setItem('token', data.token);
        this.route.navigate(['/home']);
      },
      complete: () => this.isLoading.set(false)
    })
  }
}
