import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BudgetModel,
  CategoryModel,
  TransactionModel,
  TransactionRequestModel,
} from '@/app/core/models';
import { environment } from '@/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private API_URL = `${environment.apiUrl}/transactions`;

  private readonly httpClient = inject(HttpClient);

  public getTransactions(): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(this.API_URL);
  }

  public getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.API_URL + '/category');
  }

  public getBudget(): Observable<BudgetModel[]> {
    return this.httpClient.get<BudgetModel[]>(this.API_URL + '/budget');
  }

  public createTransaction(transaction: TransactionRequestModel): Observable<TransactionModel> {
    return this.httpClient.post<TransactionModel>(this.API_URL, transaction);
  }
}
