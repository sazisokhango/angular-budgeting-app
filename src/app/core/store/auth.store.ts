import { inject, Injectable } from '@angular/core';
import { AuthService, ToastService } from '../Services';
import { UserLoginRequest, UserRequestModel } from '../models';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly service = inject(AuthService);
  private readonly toastService = inject(ToastService);

  createNewUser(request: Readonly<UserRequestModel>) {
    this.service.registerUser(request).pipe(
      catchError((error) => {
        this.toastService.add('Error Creating a new user', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  login(request: Readonly<UserLoginRequest>) {
    this.service.userLogin(request).pipe(
      catchError((error) => {
        this.toastService.add('Invali User Credentials', 'error', 3000);
        return throwError(() => error);
      })
    );
  }
}
