import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AboutComponent} from './components/about/about.component';
import {LoginComponent} from './components/login/login.component';
import {SigninComponent} from './components/signin/signin.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {TermsComponent} from './components/terms/terms.component';
import {ContactComponent} from './components/contact/contact.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardForAdminsComponent} from './components/dashboard-for-admins/dashboard-for-admins.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {adminGuard} from './guards/admin.guard';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signin', component: SigninComponent
  },
  {
    path: 'privacy', component: PrivacyComponent
  },
  {
    path: 'terms', component: TermsComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]
  },
  {
    path: 'dashboarda', component: DashboardForAdminsComponent, canActivate: [authGuard, adminGuard]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '**', component: PageNotFoundComponent
  }
];
