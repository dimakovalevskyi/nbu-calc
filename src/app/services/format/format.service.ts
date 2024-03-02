import { inject, Injectable, signal } from '@angular/core';
import { from } from 'rxjs';
import { StorageService } from '../storage/storage.service';

export type Separator = ',' | '.';

@Injectable({
  providedIn: 'root'
})
export class FormatService {
  protected storage = inject(StorageService);

  separator = signal(this.storage.get('separator', ','));

  setSeparator(value: Separator) {
    this.storage.set('separator', value);
    this.separator.set(value);
  }

  format(value: string | number | null): string {
    if (!value) {
      return '';
    }
    return value.toString().replace('.', this.separator());
  }
}
