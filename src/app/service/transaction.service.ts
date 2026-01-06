import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionModel } from '../model/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private API_URL = 'http://localhost:8080/api/transaction';

  constructor(private httpClient: HttpClient) {}

  getTransactions(): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(this.API_URL + '/all-transactions');
  }
}