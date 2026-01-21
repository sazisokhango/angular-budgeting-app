import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'error' | 'success';
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public toasts = signal<Toast[]>([]);
  private nextId = 0;

  add(message: string, type: 'success' | 'error', duration: number = 3000) {
    const toast: Toast = {
      id: this.nextId++,
      message,
      type,
      duration,
    };

    this.toasts.set([...this.toasts(), toast]);

    setTimeout(() => this.remove(toast.id), duration);
  }

  remove(index: number) {
    const current = [...this.toasts()];
    const currentIndex = this.toasts().findIndex((t) => t.id === index);
    if (currentIndex != -1) {
      current.splice(currentIndex, 1);
    }
    this.toasts.set(current);
  }
}
