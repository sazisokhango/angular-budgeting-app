import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BudgetModel,
  CategoryModel,
  TransactionModel,
  TransactionRequestModel,
} from '@/app/core/models';
import { SummaryModel } from '@/app/core/models/summary,model';
import { environment } from '@/environments/environment.development';
import { SpendByMonthModel } from '@/app/core/models/spendByMonth.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly baseUrl = `${environment.apiUrl}/transactions`;
  private readonly transactionSummaryUrl =  `${this.baseUrl}/summary`;
  private readonly monthlySummaryUrl =  `${this.baseUrl}/monthly-summary`;
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

  public updateTransaction(transaction: TransactionModel): Observable<TransactionModel> {
    return this.httpClient.put<TransactionModel>(
      `${this.baseUrl}?transactionId=${transaction.transactionId}`,
      transaction
    );
  }

  public deleteTransaction(transactionId: string): Observable<void> {
    return this.httpClient.delete<void>(this.baseUrl, { params: { transactionId } });
  }

  public getTransactionSummary(): Observable<SummaryModel> {
    return this.httpClient.get<SummaryModel>(this.transactionSummaryUrl)
  }

  public getMonthlySummary(): Observable<SpendByMonthModel[]> {
    return this.httpClient.get<SpendByMonthModel[]>(this.monthlySummaryUrl)
  }
}
