import { Component, computed, effect, inject, signal } from '@angular/core';
import { CurrencyService } from '../../services/currency/currency.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CopyIconComponent } from '../copy-icon/copy-icon.component';
import { FormatService } from '../../services/format/format.service';
import { SelectCurrencyComponent } from '../select-currency/select-currency.component';
import { SelectSeparatorComponent } from '../select-separator/select-separator.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CopyIconComponent, SelectCurrencyComponent, SelectSeparatorComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  currencyService = inject(CurrencyService);
  formatService = inject(FormatService);

  todayFormattedValue = new Date().toISOString().split('T')[0];

  currency= computed(() => this.currencyService.currency());
  separator= computed(() => this.formatService.separator());

  formattedDate = signal(this.todayFormattedValue);
  date = computed(() => new Date(this.formattedDate()));

  rate = signal<number | null>(null);
  rateEffect = effect(() => this.updateRate(), { allowSignalWrites: true });
  formattedRate = computed(() => this.formatService.format(this.rate()));

  amount = signal<number|null>(null);
  result = computed(() => {
    if (!this.rate() || !this.amount()) {
      return 0;
    }
    return Math.round(this.rate()! * this.amount()! * 100) / 100;
  });
  formattedResult = computed(() => this.formatService.format(this.result()));

  error = signal(false);

  async updateRate() {
    try {
      this.rate.set(await firstValueFrom(this.currencyService.get(this.currency(), this.date())));
    } catch (e) {
      alert('Йой! Виникла помилка під час запиту до API НБУ. Спробуйте пізніше');
      this.error.set(true);
      this.rate.set(null);
    }
  }
}
