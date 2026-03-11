import { Component, signal } from '@angular/core';
import { Drawer, ButtonComponent } from '@/app/shared';
import { FormDirective } from '@/app/shared/directives/form';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormDirective, FormsModule, ButtonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  protected readonly isLoading = signal(false);
  protected readonly formValue = signal<any>({});

  onSUbmitRegistration(_t5: any) {
    throw new Error('Method not implemented.');
  }

}
