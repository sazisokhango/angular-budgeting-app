import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = signal<Toast | null>(null);

  showSuccess(message: string) {
    this.toast.set({ message, type: 'success' });
    this.autoClear();
  }

  showError(message: string) {
    this.toast.set({ message, type: 'error' });
    this.autoClear();
  }

  private autoClear() {
    setTimeout(() => this.toast.set(null), 3000);
  }
}
