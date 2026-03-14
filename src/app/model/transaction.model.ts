import { BudgetModel } from './budget.model';
import { CategoryModel } from './category.model';

export interface TransactionModel {
  occurredAt: Date | null;
  amount: number;
  reference: string;
  description: string;
  category: CategoryModel;
  budget: BudgetModel;
  createdBy: String;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}
