import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    MatToolbar,
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
