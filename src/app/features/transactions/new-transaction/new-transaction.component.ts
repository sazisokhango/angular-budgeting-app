import { Component, EventEmitter, inject, output, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '@/app/core/service';
import { ToastService } from 'src/app/core/service/toast.service';
import { BudgetModel, CategoryModel, TransactionRequestModel } from '@/app/core/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-new-transaction',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css'],
})
export class NewTransactionComponent {
  transactionRefresher = output<void>();

  transactionService = inject(TransactionService);
  toastService = inject(ToastService);

  isLoading = signal(false);
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

  readonly budgetList = signal<BudgetModel[]>([
    { id: 0, name: '', allocation: 0, startDate: null, endDate: null },
  ]);
  readonly categoryList = signal<CategoryModel[]>([{ id: 0, name: '' }]);

  private readonly categories = toSignal(
    this.transactionService.getCategories().pipe(
      tap((categories) => {
        this.categoryList.set([...categories]);
      }),
      catchError((error) => {
        console.error(error);
        this.toastService.add('Error fetching the Categories', 'error', 3000);
        return of([] as CategoryModel[]);
      })
    ),
    { initialValue: [] }
  );

  private readonly budgets = toSignal(
    this.transactionService.getBudget().pipe(
      tap((budget) => {
        this.budgetList.set([...budget]);
      }),
      catchError((error) => {
        console.log(error), this.toastService.add('Error fetching the Budget', 'error', 3000);
        return of([] as BudgetModel[]);
      })
    ),
    { initialValue: [] }
  );

  onSubmitTransaction(form: NgForm) {
    this.isLoading.set(true);
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
          this.toastService.add('Transaction Created Successfully', 'success', 3000);
        form.resetForm();
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(error),
          this.toastService.add('Error creating Transaction','error', 3000),
          this.isLoading.set(false);
      },
    });
  }
}
