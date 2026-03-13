import { inject, Injectable } from "@angular/core";
import { AccountService, ToastService } from "../Services";
import { AccountRequestModel } from "../models";
import { catchError, throwError } from "rxjs";



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
          this.toastService.add('Error Creating accounts', 'error', 3000);
          return throwError(() => error);
        })
      );
    }

}
