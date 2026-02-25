import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { TransactionModel } from '@/app/core/models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: '[appTransactionRow]',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './transaction-row.component.html',
})
export class TransactionRowComponent {
  public readonly transaction = input.required<TransactionModel>();
  public readonly editTransaction = output<TransactionModel>();
  public readonly deleteTransaction = output<TransactionModel>();
  protected readonly faEditIcon = faEdit;
  protected readonly faTrashIcon = faTrash;

  public edit() {
    this.editTransaction.emit(this.transaction());
  }
  public delete() {
    this.deleteTransaction.emit(this.transaction());
  }
}
