
export interface TransactionRequestModel {
    accountId: string,
    occurredAt: String,
    amount: number,
    reference: string,
    description: string
    category: number,
    budget: number,
}