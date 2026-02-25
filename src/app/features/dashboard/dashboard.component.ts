import { Component } from '@angular/core';
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
}
