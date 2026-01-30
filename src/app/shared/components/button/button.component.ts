import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  readonly label = input.required<string>();
  readonly isLoading = input<boolean>(false);
  readonly isDisabled = input<boolean>(false);
  readonly type = input<'reset' | 'submit' | 'button'>('button');
}
