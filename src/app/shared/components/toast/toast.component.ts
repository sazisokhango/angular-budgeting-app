import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from 'src/app/core/service/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toastService = inject(ToastService);
}
