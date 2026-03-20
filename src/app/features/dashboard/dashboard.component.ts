import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Footer } from '@/app/features/footer';
import { ToastComponent } from '@/app/shared';
import { AuthStore } from '@/app/core/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterLink, RouterOutlet, Footer, ToastComponent],
})
export class DashboardComponent {

  protected readonly authStore = inject(AuthStore);
  protected isSidebarOpen: boolean = false;
}
