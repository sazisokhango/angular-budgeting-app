import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TransactionService } from './transaction.service';
import { TransactionModel } from '../model/transaction.model';
import { CategoryModel } from '../model/category.model';
import { BudgetModel } from '../model/budget.model';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;

  const API_URL = 'http://localhost:8080/api/transactions';

  const mockCategory: CategoryModel = {
    id: 1,
    name: 'Food',
  } as CategoryModel;

  const mockBudget: BudgetModel = {
    id: 1,
    name: 'Monthly Budget',
    allocation: 5000,
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
  } as BudgetModel;

  const mockData: TransactionModel[] = [
    {
      occurredAt: new Date('2025-01-01'),
      amount: 250,
      reference: 'REF123',
      description: 'Groceries',
      category: mockCategory,
      budget: mockBudget,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedBy: 'admin',
      updatedAt: new Date(),
    },
  ] as TransactionModel[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    });

    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transactions', () => {
    service.getTransactions().subscribe((transactions) => {
      expect(transactions).toEqual(mockData);
      expect(transactions.length).toBe(1);
    });

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
  });
});
