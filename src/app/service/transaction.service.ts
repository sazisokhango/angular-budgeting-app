import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TransactionModel } from '../model/transaction.model';
import { Observable } from 'rxjs';
import { CategoryModel } from '../model/category.model';
import { BudgetModel } from '../model/budget.model';
import { TransactionRequestModel } from '../model/transaction-request.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private API_URL = 'http://localhost:8080/api/transactions';

  httpClient = inject(HttpClient);

  getTransactions(): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(this.API_URL);
  }

  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.API_URL + '/category');
  }

  getBudget(): Observable<BudgetModel[]> {
    return this.httpClient.get<BudgetModel[]>(this.API_URL + '/budget');
  }

  createTransaction(transaction: TransactionRequestModel) : Observable<TransactionModel> {
    return this.httpClient.post<TransactionModel>(this.API_URL,transaction);
  }
}
