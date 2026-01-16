export interface BudgetModel {
    id: number,
    name: string,
    allocation: number,
    startDate: Date | null,
    endDate: Date | null
}