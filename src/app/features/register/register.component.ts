import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '@/app/shared';
import { FormDirective } from '@/app/shared/directives/form';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthStore } from '@/app/core/store/auth.store';
import { Router } from '@angular/router';
import { ToastService } from '@/app/shared/toast.service';

@Component({
  selector: 'app-register',
  imports: [FormDirective, FormsModule, ButtonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  protected readonly isLoading = signal(false);
  protected readonly formValue = signal<any>({});

  private readonly store = inject(AuthStore);
  private readonly toastService = inject(ToastService);
  private readonly route = inject(Router);

  protected avatarFile: File | null = null;
  protected avatarPreview = signal<string | null>(null);

  onSubmitRegistration(form: NgForm) {
    if (form.invalid) return;

    this.isLoading.set(true);

    const formData = new FormData();

    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('password', form.value.password);

    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile);
    }

    this.store.createNewUser(formData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);

        this.toastService.add('You registered successfully', 'success', 3000);

        this.route.navigate(['/account']);
      },
      complete: () => this.isLoading.set(false),
    });
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.avatarFile = input.files[0];

      this.avatarPreview.set(URL.createObjectURL(this.avatarFile));
    }
  }
}
