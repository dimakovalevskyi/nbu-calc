import { Component, computed, inject, signal } from '@angular/core';
import { FormatService, Separator } from '../../services/format/format.service';

@Component({
  selector: 'app-select-separator',
  standalone: true,
  imports: [],
  templateUrl: './select-separator.component.html',
  styleUrl: './select-separator.component.scss'
})
export class SelectSeparatorComponent {
  protected formatService = inject(FormatService);

  value= computed(() => this.formatService.separator());

  setValue(value: Separator) {
    this.formatService.setSeparator(value);
  }
}
