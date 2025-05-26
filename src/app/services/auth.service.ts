import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly currentUserSubject;
  currentUser$;
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') ?? 'null')
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }


  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<any>('https://fakestoreapi.com/auth/login', {
      username,
      password
    }).pipe(
      map(response => {
        // Create user object with roles
        const user: User = {
          id: response.id,
          username: username,
          roles: username === 'johnd' ? ['admin'] : ['user'] // Only johnd is admin
        };

        // Store user details and jwt token in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
