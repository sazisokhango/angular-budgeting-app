import { Component, input, output, signal } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-confirm-dialog',
  imports: [ButtonComponent],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  readonly confirmed = output<boolean>();
  readonly label = input.required();

  protected readonly isProcessing = signal(false);
  onYes() {
    this.isProcessing.set(true);
    this.confirmed.emit(true)
  }

  onNo() {
    this.confirmed.emit(false)
  }
}
