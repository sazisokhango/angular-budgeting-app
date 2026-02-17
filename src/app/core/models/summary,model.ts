import { SpendByCategoryModel } from './spendByCategory';

export interface SummaryModel {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  totalTransactions: number;
  pendingTransactions: number;
  spendByCategory: SpendByCategoryModel[];
}
