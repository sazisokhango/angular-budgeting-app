import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTransactionComponent } from './new-transaction.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { TransactionStore } from '../../../../core/store/transaction.store';
import { ToastService } from '../../../../core/service';

describe('NewTransactionComponent', () => {
  let fixture: ComponentFixture<NewTransactionComponent>;
  let component: NewTransactionComponent;
  let store: any;
  let toast: any;

  beforeEach(async () => {
    store = {
      categories: {
        value: vi.fn().mockReturnValue([{ id: 1, name: 'Subscriptions' }]),
      },
      budgets: {
        value: vi.fn().mockReturnValue([{ id: 1, name: 'Entertainment' }]),
      },
      transactions: {
        reload: vi.fn(),
      },
      createTransaction: vi.fn().mockReturnValue(of({})),
    };

    toast = {
      add: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, NewTransactionComponent],
      providers: [
        { provide: TransactionStore, useValue: store },
        { provide: ToastService, useValue: toast },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTransactionComponent);
    component = fixture.componentInstance;

    component.category.set(1);
    component.budget.set(1);

    fixture.detectChanges();
  });

  it('should POST transaction, show success toast, refresh and emit event', () => {
    const refreshSpy = vi.spyOn(component.transactionRefresher, 'emit');

    component.amount.set(250);
    component.reference.set('Netflix');
    component.description.set('Monthly Subscription');
    component.occurredAt.set(new Date('2026-01-01'));

    const form = {
      resetForm: vi.fn(),
    } as any;

    component.onSubmitTransaction(form);

    expect(store.createTransaction).toHaveBeenCalled();
    expect(store.transactions.reload).toHaveBeenCalled();
    expect(refreshSpy).toHaveBeenCalled();
    expect(toast.add).toHaveBeenCalledWith(
      'Transaction created Successfully',
      'success',
      4000
    );
    expect(component.isLoading()).toBe(true);
  });
});
