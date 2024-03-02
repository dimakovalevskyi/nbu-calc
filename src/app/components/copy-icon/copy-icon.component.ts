import { Component, inject, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-copy-icon',
  standalone: true,
  imports: [],
  templateUrl: './copy-icon.component.html',
  styleUrl: './copy-icon.component.scss'
})
export class CopyIconComponent {
  clipboard = inject(Clipboard);

  @Input()
  set value(value: string | number | null) {
    if (this._value !== value) {
      this._value = value;
      this.copied = false;
    }
  }

  protected _value: string | number | null = '';

  copied = false;

  copy() {
    if (!this._value) {
      return;
    }
    this.clipboard.copy(this._value.toString());
    this.copied = true;
  }
}
