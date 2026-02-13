import { NgClass } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  readonly label = input.required<string>();
  readonly buttonType = input.required<'success' | 'info' | 'danger'>();
  readonly isLoading = input<boolean>(false);
  readonly isDisabled = input<boolean>(false);
  readonly type = input<'reset' | 'submit' | 'button'>('button');
  readonly action = output();

  protected readonly buttonClass = computed(() => ({
    'bg-red-500 hover:bg-red-700': this.buttonType() === 'danger',
    'bg-sky-500 hover:bg-sky-600': this.buttonType() === 'success',
    'bg-slate-200 hover:bg-slate-300': this.buttonType() === 'info',
  }));

  actionMethod() {
    if (this.isLoading()) return;
    if (this.type() !== 'submit') {
      this.action.emit();
    }
  }
}
