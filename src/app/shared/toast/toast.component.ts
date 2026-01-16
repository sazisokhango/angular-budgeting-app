import { Component, inject } from '@angular/core';
import { ToastService } from '../toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class Toast {
  toastService = inject(ToastService);
}
