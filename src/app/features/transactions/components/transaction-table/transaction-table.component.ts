import { Component, input, output } from '@angular/core';
import { TransactionModel } from '@/app/core/models';
import { TransactionRowComponent } from '@/app/features/transactions';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css',
  imports: [TransactionRowComponent],
})
export class TransactionTableComponent {
  public readonly tableData = input.required<TransactionModel[]>();
  protected readonly editTransactionRequested = output<TransactionModel>();
  protected readonly deleteTransactionRequested = output<TransactionModel>();

  public requestTransactionEdit(transaction: TransactionModel) {
    this.editTransactionRequested.emit(transaction);
  }

  public requestTransactionDelete(transaction: TransactionModel) {
    this.deleteTransactionRequested.emit(transaction)
  }
}
