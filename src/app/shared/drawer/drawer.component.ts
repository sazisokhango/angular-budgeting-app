import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class Drawer {
    @Input() title = '';
    @Output() closeDrawer = new EventEmitter();


    onClose() {
      this.closeDrawer.emit();
    }
}
