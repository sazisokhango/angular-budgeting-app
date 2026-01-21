import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTransactionComponent } from '../new-transaction/new-transaction.component';
import { TransactionService } from '../../../core/service/transaction.service';
import { ToastService } from '../../../core/service/toast.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { resolveComponentResources } from '@angular/core/testing';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { BudgetModel } from '../../../core/model/budget.model';

describe('NewTransactionComponent', () => {
  let fixture: ComponentFixture<NewTransactionComponent>;
  let component: NewTransactionComponent;
  let transactionService: any;
  let toastService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, NewTransactionComponent],
      providers: [
        {
          provide: TransactionService,
          useValue: {
            createTransaction: vi.fn().mockReturnValue(of({})),
            getCategories: vi.fn().mockReturnValue(of([])),
            getBudget: vi.fn().mockReturnValue(of([])),
          },
        },
        {
          provide: ToastService,
          useValue: {
            showSuccess: vi.fn(),
            showError: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    // await resolveComponentResources();

    fixture = TestBed.createComponent(NewTransactionComponent);
    component = fixture.componentInstance;

    transactionService = TestBed.inject(TransactionService);
    toastService = TestBed.inject(ToastService);

    const category = { id: 1, name: 'Subscriptions' };
    const budget = { id: 1, name: 'Entertainment' } as BudgetModel;

    component.categoryList.set([category]);
    component.budgetList.set([budget]);

    component.category.set(category);
    component.budget.set(budget);

    fixture.detectChanges();
  });

  it('should POST transaction, show success toast and refresh dashboard', () => {
    const refreshSpy = vi.spyOn(component.transactionRefresher, 'emit');

    component.amount.set(250);
    component.reference.set('Netflix');
    component.description.set('Monthly Subscription');
    component.occurredAt.set(new Date('2026-01-01'));

    const form = {
      resetForm: vi.fn(),
    } as unknown as NgForm;

    component.onSubmitTransaction(form);

    expect(transactionService.createTransaction).toHaveBeenCalled();
    expect(toastService.showSuccess).toHaveBeenCalledWith(
      'Transaction Created Successfully'
    );
    expect(refreshSpy).toHaveBeenCalled();
    expect(component.isLoading()).toBe(false);
  });
});
