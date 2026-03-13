import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "@/app/shared";

@Component({
  selector: 'app-logn',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  protected readonly isLoading = signal(false);
  protected readonly formValue = signal<any>({});

  onLoginUser(event: any) {
    throw new Error('Method not implemented.');
  }
}
