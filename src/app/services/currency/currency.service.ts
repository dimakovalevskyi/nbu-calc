import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { StorageService } from '../storage/storage.service';

export type Currency = 'USD' | 'EUR';

export type APIResponse = Array<{
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}>;
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  protected http = inject(HttpClient);
  protected storage = inject(StorageService);

  currency = signal(this.storage.get('currency', 'USD'));
  setCurrency(value: Currency) {
    this.storage.set('currency', value);
    this.currency.set(value);
  }

  protected getUrl(currency: Currency, date: Date) {
    const formattedDate = date.toISOString().split('T')[0].replaceAll('-', '');
    return `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&date=${formattedDate}&json`;
  }

  get(currency: Currency, date: Date) {
    return this.http.get<APIResponse>(this.getUrl(currency, date))
      .pipe(map((body) => {
        if (body?.[0]?.rate) {
          return Math.round(body[0].rate * 100) / 100;
        } else {
          throw new Error('Bad response');
        }
      }));
  }
}
