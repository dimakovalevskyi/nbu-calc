import { Component, computed, inject, signal } from '@angular/core';
import { Currency, CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-select-currency',
  standalone: true,
  imports: [],
  templateUrl: './select-currency.component.html',
  styleUrl: './select-currency.component.scss'
})
export class SelectCurrencyComponent {
  protected currencyService = inject(CurrencyService);

  value= computed(() => this.currencyService.currency());

  setValue(value: Currency) {
    this.currencyService.setCurrency(value);
  }
}
