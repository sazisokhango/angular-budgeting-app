import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TransactionModel } from '@/app/core/models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[appTransactionRow]',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './transaction-row.component.html',
  styleUrl: './transaction-row.component.css',
})
export class TransactionRowComponent {
  public readonly transaction = input.required<TransactionModel>();
  public readonly editTransaction = output<TransactionModel>();
  protected readonly faEditIcon = faEdit;

  public edit() {
    this.editTransaction.emit(this.transaction());
  }
}
