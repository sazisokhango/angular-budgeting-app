import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer.componen';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterLink, RouterOutlet, Footer],

  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarOpen: boolean = false;
}
