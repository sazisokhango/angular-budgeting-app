import { inject, Injectable } from '@angular/core';
import { AccountService } from '../Services';
import { AccountRequestModel } from '../models';
import { BehaviorSubject, catchError, of, switchMap, throwError } from 'rxjs';
import { ToastService } from '@/app/shared/toast.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AccountStore {
  private readonly service = inject(AccountService);
  private readonly toastService = inject(ToastService);

  private readonly reload$ = new BehaviorSubject<void>(undefined);

  private readonly accounts$ = this.reload$.pipe(
    switchMap(() => this.service.getAllAccounts().pipe(
      catchError((error) => {
        if (error.status !== 403) {
          this.toastService.add('Error getting all accounts', 'error', 3000);
        }
        return of([])
      })
    ))
  )

  public readonly accounts = toSignal(this.accounts$, {initialValue: []})

  reloadAccounts() {
    this.reload$.next();
  }

  createAccount(request: Readonly<AccountRequestModel>) {
    return this.service.createAccount(request).pipe(
      catchError((error) => {
        this.toastService.add('Error creating accounts', 'error', 3000);
        return of([]);
      })
    );
  }
}
