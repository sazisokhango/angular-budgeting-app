import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, NEVER } from 'rxjs';
import { ToastService, TransactionService } from '@/app/core/service';
import { TransactionTableComponent } from '@/app/features/transactions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [TransactionTableComponent],
})
export class HomeComponent {
  protected readonly transactionService = inject(TransactionService);
  protected readonly toastService = inject(ToastService);

  protected readonly transactions = toSignal(
    this.transactionService.getTransactions().pipe(
      map((data) =>
        data
          .sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          })
          .slice(0, 5)
      ),
      catchError((error) => {
        this.toastService.showError('Error creating Transaction');
        return NEVER;
      })
    ),
    { initialValue: [] }
  );
}
