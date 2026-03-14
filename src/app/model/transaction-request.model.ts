import { BudgetModel } from "./budget.model";
import { CategoryModel } from "./category.model";

export interface TransactionRequestModel {
    occurredAt: Date | null,
    amount: number,
    reference: string,
    description: string
    category: CategoryModel,
    budget: BudgetModel,
}