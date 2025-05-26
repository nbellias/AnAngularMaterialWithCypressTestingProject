import {Component, inject, OnInit} from '@angular/core';
import {Country} from '../../models/country';
import {ApiService} from '../../services/api.service';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {FormsModule} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    MatLabel,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];
  selectedCountry: Country | null = null;
  isLoading = true;

  private readonly countriesService = inject(ApiService);


  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        this.selectedCountry = this.countries[0]; // Set first country as default
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading countries:', err);
        this.isLoading = false;
      }
    });
  }

  onCountrySelected(country: Country): void {
    this.selectedCountry = country;
  }

  getCurrencyNames(): string {
    if (!this.selectedCountry?.currencies) return 'No currency data';
    return Object.values(this.selectedCountry.currencies)
      .map(currency => currency.name)
      .join(', ');
  }
}
