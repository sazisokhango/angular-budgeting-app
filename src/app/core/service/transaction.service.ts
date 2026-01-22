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
  private readonly baseUrl = `${environment.apiUrl}/transactions`;
  private readonly categoryUrl = `${this.baseUrl}/category`;
  private readonly budgetUrl = `${this.baseUrl}/budget`;


  private readonly httpClient = inject(HttpClient);

  public getTransactions(): Observable<TransactionModel[]> {
    return this.httpClient.get<TransactionModel[]>(this.baseUrl);
  }

  public getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(this.categoryUrl);
  }

  public getBudgets(): Observable<BudgetModel[]> {
    return this.httpClient.get<BudgetModel[]>(this.budgetUrl);
  }

  public createTransaction(transaction: TransactionRequestModel): Observable<TransactionModel> {
    return this.httpClient.post<TransactionModel>(this.baseUrl, transaction);
  }
}
