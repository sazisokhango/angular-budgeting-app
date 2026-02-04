import { Component, input, output } from '@angular/core';
import { TransactionRowComponent } from '../transaction-row/transaction-row.component';
import { TransactionModel } from '@/app/core/models';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css',
  imports: [TransactionRowComponent],
})
export class TransactionTableComponent {
  public readonly tableData = input.required<TransactionModel[]>();
  protected readonly editTranactionRequested = output<TransactionModel>();
  protected readonly deleteTransactionRequested = output<TransactionModel>();

  public requestTransactionEdit(transaction: TransactionModel) {
    this.editTranactionRequested.emit(transaction);
  }

  public requestTransactionDelete(transaction: TransactionModel) {
    this.deleteTransactionRequested.emit(transaction)
  }
}
