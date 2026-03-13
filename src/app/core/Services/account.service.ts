import { environment } from '@/environments/environment.development';
import { inject, Injectable } from '@angular/core';
import { AccountRequestModel, AccountResponseModel } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly baseUrl = `${environment.apiUrl}/accounts`;
  private readonly httpClient = inject(HttpClient);

  createAccount(accountRequest: Readonly<AccountRequestModel>): Observable<AccountResponseModel> {
    return this.httpClient.post<AccountResponseModel>(this.baseUrl, accountRequest);
  }
}
