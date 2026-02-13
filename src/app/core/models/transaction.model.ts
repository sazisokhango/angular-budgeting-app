import { BudgetModel } from './budget.model';
import { CategoryModel } from './category.model';

export interface TransactionModel {
  transactionId: string
  occurredAt: Date;
  amount: number;
  reference: string;
  description: string;
  category: CategoryModel;
  budget: BudgetModel;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}
