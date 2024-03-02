import { Injectable } from '@angular/core';
import { Separator } from '../format/format.service';
import { Currency } from '../currency/currency.service';

export type StorageSchema = {
  separator: Separator;
  currency: Currency;
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  prefix = 'nbu-calc_';

  protected _get(key: string): any {
    const item = localStorage.getItem(this.prefix + key);
    try {
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error parsing localStorage item', key, error);
      return null;
    }
  }

  protected _set(key: string, value: any): void {
    try {
      const item = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, item);
    } catch (error) {
      console.error('Error saving to localStorage', key, value, error);
    }
  }

  get<T extends keyof StorageSchema>(key: T, fallback: StorageSchema[T]): StorageSchema[T] {
    const value = this._get(key);
    if (value === null) {
      return fallback;
    }
    return value;
  }

  set<T extends keyof StorageSchema>(key: T, value: StorageSchema[T]): void {
    this._set(key, value);
  }

}
