import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionsComponent } from '@/app/features/transactions';
import { Component, input, output } from '@angular/core';
import { TransactionStore } from '@/app/core/store/transaction.store';
import { of } from 'rxjs';

@Component({
  selector: 'app-transaction-table',
  template: '',
  standalone: true,
})
class TransactionTableStub {
  tableData = input<any>();
  editTransactionRequested = output<any>();
  deleteTransactionRequested = output<any>();
}

//mocking a dialog component
@Component({
  selector: 'app-confirm-dialog',
  template: '',
  standalone: true,
})
class ConfirmDialogStub {
  confirmed = output<boolean>();
}

//mocking a drawer component
@Component({
  selector: 'app-drawer',
  template: '<ng-content></ng-content>',
  standalone: true,
})
class DrawerStub {}

//mocking a edit transaction component
@Component({
  selector: 'app-edit-transaction',
  template: '',
  standalone: true,
})
class EditTransactionStub {
  transaction = input<any>();
}

//mocking a transaction model
const mockTransaction = {
  transactionId: 'tx-1',
  amount: 100,
  reference: 'REF',
  description: 'desc',
  occurredAt: new Date(),
  category: { id: 1, name: 'Entertainment' },
  budget: { id: 1, name: 'Entertainment' },
};

//mocking transaction store
const transactionStoreMock = {
  transactions: {
    value: () => [mockTransaction],
    reload: vi.fn(),
  },
  deleteTransaction: vi.fn(() => of(void 0)),
};

describe('Transaction page', () => {
  let fixture: ComponentFixture<TransactionsComponent>;
  let component: TransactionsComponent;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [TransactionsComponent],
      providers: [{ provide: TransactionStore, useValue: transactionStoreMock }],
    })
      .overrideComponent(TransactionsComponent, {
        set: {
          imports: [TransactionTableStub, ConfirmDialogStub, DrawerStub, EditTransactionStub],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create transactions component', () => {
    expect(component).toBeTruthy();
  });

  it('should open edit drawer when edit is requested', () => {
    const tableDebug = fixture.debugElement.query(
      (de) => de.componentInstance instanceof TransactionTableStub
    );

    const table = tableDebug.componentInstance as TransactionTableStub;

    table.editTransactionRequested.emit(mockTransaction);

    fixture.detectChanges();

    expect(component.selectedTransaction()).toEqual(mockTransaction);
    expect(component.isDrawerOpen()).toBe(true);
    expect(component.drawerMode).toBe('edit-mode');
  });

  it('should delete transaction after confirmation', () => {
    const tableDebug = fixture.debugElement.query(
      (de) => de.componentInstance instanceof TransactionTableStub
    );

    const table = tableDebug.componentInstance as TransactionTableStub;

    table.deleteTransactionRequested.emit(mockTransaction);
    fixture.detectChanges();

    expect(component.showConfirmation()).toBe(true);

    const confirmDebug = fixture.debugElement.query(
      (de) => de.componentInstance instanceof ConfirmDialogStub
    );

    const confirm = confirmDebug.componentInstance as ConfirmDialogStub;

    confirm.confirmed.emit(true);
    fixture.detectChanges();

    expect(transactionStoreMock.deleteTransaction).toHaveBeenCalledWith('tx-1');
    expect(component.showConfirmation()).toBe(false);
  });

  it('should not call delete when use cancels', () => {
    const tableDebug = fixture.debugElement.query(
      (de) => de.componentInstance instanceof TransactionTableStub
    );

    const table = tableDebug.componentInstance as TransactionTableStub;

    table.deleteTransactionRequested.emit(mockTransaction);
    fixture.detectChanges();

    expect(component.showConfirmation()).toBe(true);

    const confirmDebug = fixture.debugElement.query(
      (de) => de.componentInstance instanceof ConfirmDialogStub
    );

    const confirm = confirmDebug.componentInstance as ConfirmDialogStub;

    confirm.confirmed.emit(false);
    fixture.detectChanges();

    expect(transactionStoreMock.deleteTransaction).not.toHaveBeenCalled();
    expect(component.showConfirmation()).toBe(false);

  });

  it('should reload transactions after the delete', () => {
    const tabledebug = fixture.debugElement.query(
      (de) => de.componentInstance instanceof TransactionTableStub
    );

    const table = tabledebug.componentInstance as TransactionTableStub;
    table.deleteTransactionRequested.emit(mockTransaction);
    fixture.detectChanges();

    const confirmDebug = fixture.debugElement.query(
      (de) => de.componentInstance instanceof ConfirmDialogStub
    );
    const confirm = confirmDebug.componentInstance as ConfirmDialogStub;
    confirm.confirmed.emit(true);
    fixture.detectChanges();

    expect(transactionStoreMock.transactions.reload).toHaveBeenCalled();
  });
});
