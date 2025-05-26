import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);

  get currentUser() {
    return this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }

}
