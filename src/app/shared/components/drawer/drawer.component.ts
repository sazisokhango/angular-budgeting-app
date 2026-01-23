import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class Drawer {
    public readonly title = input('');
    protected readonly closeDrawer = output<void>()

    onClose() {
      this.closeDrawer.emit();
    }
}
