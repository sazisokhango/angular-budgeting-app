import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer.componen';
import { Toast } from "../shared/toast/toast.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterLink, RouterOutlet, Footer, Toast],

  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarOpen: boolean = false;
}
