import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TransactionModel } from '@/app/core/models';

@Component({
  selector: '[appTransactionRow]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-row.component.html',
  styleUrl: './transaction-row.component.css',
})
export class TransactionRowComponent {
  public readonly transaction = input.required<TransactionModel>();
}
