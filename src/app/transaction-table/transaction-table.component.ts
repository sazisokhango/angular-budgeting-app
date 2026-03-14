import { Component, Input } from '@angular/core';
import { TransactionModel } from '../model/transaction.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-table',
  imports: [CommonModule],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css',
})
export class TransactionTableComponent {
  @Input() tableData: TransactionModel[] = [];
}
