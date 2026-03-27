import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { vi } from 'vitest';
import { of } from 'rxjs';
import { NewTransactionComponent } from '@/app/features/transactions'
import { TransactionStore } from '../../store/transaction.store';
import { ToastService } from '@/app/shared/toast.service';
import { TransactionRequestModel } from '@/app/core/models';

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


    fixture.detectChanges();
  });

  it('should POST transaction, show success toast, refresh and emit event', () => {
    const refreshSpy = vi.spyOn(component.transactionRefresher, 'emit');

    const form = {
      form: {
        value: {
          account: 1,
          amount: 300,
          reference: 'ref',
          occurredAt: '2024-01-01',
          description: 'desc',
          category: '1',
          budget: '1'
        }
      },
      resetForm: vi.fn(),
    } as any;

    component.onSubmitTransaction(form);

    expect(store.createTransaction).toHaveBeenCalled();
    expect(refreshSpy).toHaveBeenCalled();
    expect(toast.add).toHaveBeenCalledWith(
      'Transaction created Successfully',
      'success',
      4000
    );
    expect(component.isLoading()).toBe(true);
  });
});
