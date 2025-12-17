import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TransactionModel } from '../model/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private  API_URL: string = 'http://localhost:8080/api/transaction';
  private httpClient = inject(HttpClient);

  getTransactions(): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(this.API_URL + '/all-transactions');
  }
}
