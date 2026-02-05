import { TestBed } from '@angular/core/testing';
import { TransactionsComponent } from './transaction-page.component';

describe('Transaction page', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsComponent],
    }).compileComponents();
  });

  it('should create transactions component', () =>  {
    const fixture = TestBed.createComponent(TransactionsComponent)
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  })
});
