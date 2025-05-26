import { HomeComponent } from './home.component';
import { ApiService } from '../../services/api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  beforeEach(() => {
    // Global mock that can be overridden in specific tests
    cy.intercept('GET', 'https://restcountries.com/v3.1/all*', {
      fixture: 'countries.json',
      delay: 100 // Simulates network delay for more realistic test
    }).as('getCountries');

    cy.mount(HomeComponent, {
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule
      ],
      providers: [
        ApiService,
        provideHttpClient(withInterceptorsFromDi())
      ]
    });
  });

  it('should display loading state initially', () => {
    cy.get('.loading').should('contain', 'Loading countries...');
    cy.wait('@getCountries'); // Ensure API call completes
  });

  it('should display countries after loading', () => {
    cy.wait('@getCountries');
    cy.get('.loading').should('not.exist');
    cy.get('mat-select')
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('should display country details when a country is selected', () => {
    cy.wait('@getCountries');

    // More reliable select interaction
    cy.get('mat-select').click();
    cy.get('.cdk-overlay-container mat-option')
      .should('have.length.gt', 0)
      .first()
      .click({ force: true });

    // More specific assertions
    cy.get('.country-details h3').should('be.visible');
    cy.contains('Common Name:').should('be.visible');
    cy.contains('Capital:').should('be.visible');
  });
});
