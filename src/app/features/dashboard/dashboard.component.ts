import { Component, computed, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Footer } from '@/app/features/footer';
import { ToastComponent } from '@/app/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterLink, RouterOutlet, Footer, ToastComponent],
})
export class DashboardComponent {
  protected isSidebarOpen: boolean = false;
  protected isRegistration = signal(true);

  protected get isAlreadyLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  toggleRegistration() {
    this.isRegistration.update((t) => (t = !t));
  }
}
