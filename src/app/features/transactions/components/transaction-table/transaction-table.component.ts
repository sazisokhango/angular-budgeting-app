import { Component, input } from '@angular/core';
import { TransactionRowComponent } from '../transaction-row/transaction-row.component';
import { TransactionModel } from '@/app/core/models';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css',
  imports: [TransactionRowComponent],
})
export class TransactionTableComponent {
  public tableData = input.required<TransactionModel[]>();
}
