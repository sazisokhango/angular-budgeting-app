import { inject, Injectable } from "@angular/core";
import { AccountService } from "../Services";
import { AccountRequestModel } from "../models";
import { catchError, throwError } from "rxjs";
import { ToastService } from "@/app/shared/toast.service";



  @Injectable({
    providedIn: 'root'
  }
  )
export class AccountStore {
    private readonly service = inject(AccountService);
    private readonly toastService = inject(ToastService);
  
    createAccount(request: Readonly<AccountRequestModel>) {
      return this.service.createAccount(request).pipe(
        catchError((error) => {
          this.toastService.add('Error creating accounts', 'error', 3000);
          return throwError(() => error);
        })
      );
    }

    getAccounts() {
      return this.service.getAllAccounts().pipe(
        catchError((error) => {
          this.toastService.add('Error getting all accounts', 'error', 3000);
          return throwError(() => error);
        })
      )
    }
}
