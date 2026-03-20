import { Component,  effect, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Footer } from '@/app/features/footer';
import { ToastComponent } from '@/app/shared';
import { AuthStore } from '@/app/core/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterLink, RouterOutlet, Footer, ToastComponent, FontAwesomeModule],
})
export class DashboardComponent {
  protected readonly authStore = inject(AuthStore);
  protected isSidebarOpen: boolean = false;
  protected readonly faLogout = faArrowAltCircleRight;
  protected isDropdownOpen = signal(false);

  constructor() {
    effect(()=> {
      if(this.authStore.isAuthenticated()) {
        this.isDropdownOpen.set(false)
      }
    })
  }

  get avatarUrl() {
    return this.authStore.user().avatar;
  }
}
