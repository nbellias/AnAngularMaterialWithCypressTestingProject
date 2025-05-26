import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-for-admins',
  imports: [],
  templateUrl: './dashboard-for-admins.component.html',
  styleUrl: './dashboard-for-admins.component.css'
})
export class DashboardForAdminsComponent {
  private readonly authService = inject(AuthService);

  get currentUser() {
    return this.authService.currentUserValue;
  }

  logout() {
    this.authService.logout();
  }
}
