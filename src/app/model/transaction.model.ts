import { BudgetModel } from "./budget.model";
import { CategoryModel } from "./category.model";
import { ScheduleModel } from "./schedule.model";


export interface TransactionModel {
      occurredAt: Date | null,
      amount: number,
      reference: string,
      description: string
      category: CategoryModel,
      budget: BudgetModel,
      schedule: ScheduleModel,
      createdBy: String,
      createdAt: Date,
      updatedBy: string,
      updatedAt: Date,
}