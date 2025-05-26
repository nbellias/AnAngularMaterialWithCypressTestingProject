import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'https://restcountries.com/v3.1';
  private readonly fields = 'name,capital,currencies';
  private readonly http = inject(HttpClient);

  /**
   * Get all countries with basic fields
   */
  getAllCountries(): Observable<Country[]> {
    const url = `${this.baseUrl}/all?fields=${this.fields}`;
    return this.http.get<Country[]>(url);
  }

  /**
   * Get countries by name
   * @param name Country name to search for
   */
  getCountriesByName(name: string): Observable<Country[]> {
    const url = `${this.baseUrl}/name/${encodeURIComponent(name)}?fields=${this.fields}`;
    return this.http.get<Country[]>(url);
  }

  /**
   * Get countries by language
   * @param language Language code to search for (e.g., 'es', 'fr')
   */
  getCountriesByLanguage(language: string): Observable<Country[]> {
    const url = `${this.baseUrl}/lang/${encodeURIComponent(language)}?fields=${this.fields}`;
    return this.http.get<Country[]>(url);
  }

  /**
   * Get countries by capital city
   * @param capital Capital city name to search for
   */
  getCountriesByCapital(capital: string): Observable<Country[]> {
    const url = `${this.baseUrl}/capital/${encodeURIComponent(capital)}?fields=${this.fields}`;
    return this.http.get<Country[]>(url);
  }
}
