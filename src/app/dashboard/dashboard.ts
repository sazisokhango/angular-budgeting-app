import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [RouterLink, RouterOutlet],

  styleUrl: './dashboard.css',
})
export class Dashboard {

}
