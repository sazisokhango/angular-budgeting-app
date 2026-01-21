import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class Drawer {
    public title = input('');
    protected closeDrawer = output<void>()

    onClose() {
      this.closeDrawer.emit();
    }
}
