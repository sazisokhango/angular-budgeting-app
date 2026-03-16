import { inject, Injectable } from '@angular/core';
import { UserLoginRequest } from '../models';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '@/app/shared/toast.service';
import { AuthService } from '../Services';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly service = inject(AuthService);
  private readonly toastService = inject(ToastService);

  createNewUser(request: Readonly<FormData>) {
    return this.service.registerUser(request).pipe(
      catchError((error) => {
        this.toastService.add('Error Creating a new user', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  login(request: Readonly<UserLoginRequest>) {
    return this.service.userLogin(request).pipe(
      catchError((error) => {
        this.toastService.add('Invalid User Credentials', 'error', 3000);
        return throwError(() => error);
      })
    );
  }
}
