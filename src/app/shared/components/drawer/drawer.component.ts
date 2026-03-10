import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.component.html',
})
export class Drawer {
    public readonly title = input('');
    protected readonly closeDrawer = output<void>()

    onClose() {
      this.closeDrawer.emit();
    }
}
