import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const currentUser = authService.currentUserValue;
  const isApiUrl = req.url.startsWith('https://fakestoreapi.com/');

  if (currentUser && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser.id}` // Using username as token for demo
      }
    });
  }

  return next(req);
};
