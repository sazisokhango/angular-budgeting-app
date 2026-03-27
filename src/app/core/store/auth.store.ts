import { computed, inject, Injectable, signal } from '@angular/core';
import { UserLoginRequest, UserResponseModel } from '../models';
import { catchError, tap, throwError } from 'rxjs';
import { ToastService } from '@/app/shared/toast.service';
import { AuthService } from '../Services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly service = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  public readonly token = signal<String | null>(localStorage.getItem('token'));
  public readonly user = signal<UserResponseModel>(this.initializeUser());
  
  public readonly isAuthenticated = computed(() => {
    return this.token() !== null;
  });

  public login(request: Readonly<UserLoginRequest>) {
    return this.service.userLogin(request).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.token.set(response.token);
        this.user.set(response);
      }),
      catchError((error) => {
        this.toastService.add('Invalid User Credentials', 'error', 3000);
        return throwError(() => error);
      })
    );
  }

  private initializeUser(): UserResponseModel {
    return {
      avatar: '',
      email: '',
      id: '',
      name: '',
      token: '',
    };
  }

  public logout() {
    localStorage.removeItem('token');
    this.user.update((t) => (t = this.initializeUser()));
    this.token.update((t) => (t = null));
    this.router.navigate(['/login']);
    this.toastService.add('Logged out successfully', 'success', 2000);
  }

  createNewUser(request: Readonly<FormData>) {
    return this.service.registerUser(request).pipe(
      catchError((error) => {
        this.toastService.add('Error Creating a new user', 'error', 3000);
        return throwError(() => error);
      })
    );
  }
}
