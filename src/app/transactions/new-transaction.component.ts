import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { TransactionService } from '../service/transaction.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BudgetModel } from '../model/budget.model';
import { CategoryModel } from '../model/category.model';
import { TransactionRequestModel } from '../model/transaction-request.model';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-new-transaction',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-transaction.component.html',
  styleUrl: './new-transaction.component.css',
})
export class NewTransactionComponent implements OnInit {
  @Output() transactionRefresher = new EventEmitter<void>();

  transactionService = inject(TransactionService);
  toastService = inject(ToastService);

  occurredAt = signal<Date>(new Date());
  amount = signal<number>(0);
  reference = signal<string>('');
  description = signal<string>('');
  budget = signal<BudgetModel>({
    id: 0,
    name: '',
    allocation: 0,
    startDate: null,
    endDate: null,
  });
  category = signal<CategoryModel>({
    id: 0,
    name: '',
  });

  budgetList = signal<BudgetModel[]>([
    { id: 0, name: '', allocation: 0, startDate: null, endDate: null },
  ]);
  categoryList = signal<CategoryModel[]>([{ id: 0, name: '' }]);

  ngOnInit(): void {
    this.transactionService.getCategories().subscribe({
      next: (categories) => {
        this.categoryList.set([...categories]);
      },
      error: (error) => {
        console.log(error), this.toastService.showError('Error fetching the Categories');
      },
    });

    this.transactionService.getBudget().subscribe({
      next: (budget) => this.budgetList.set([...budget]),
      error: (error) => {
        console.log(error), this.toastService.showError('Error fetching the Budget');
      },
    });
  }

  onSubmitTransaction(form: NgForm) {
    const category = this.categoryList().find((category) => (category.name = this.category.name));
    const budget = this.budgetList().find((budget) => (budget.name = this.budget.name));
    const transaction: TransactionRequestModel = {
      amount: this.amount(),
      reference: this.reference(),
      occurredAt: this.occurredAt(),
      description: this.description(),
      category: category!,
      budget: budget!,
    };
    this.transactionService.createTransaction(transaction).subscribe({
      next: (data) => {
        this.transactionRefresher.emit(),
          this.toastService.showSuccess('Transaction Created Successfully');
        form.resetForm();
      },
      error: (error) => {
        console.log(error), this.toastService.showError('Error creating Transaction');
      },
    });
  }
}
