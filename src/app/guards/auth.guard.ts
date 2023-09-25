import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // const token = authGuard.getToken();
  // if(! token) {
  //   router.navigate(['/home']);
  //   return false;
  // }
  // return true;

  // LISTENING TO THE user VARIABLE CHANGES IN AuthService SERVICE
  return authService.user$
  .pipe(
    map(user => {
      if(user?.role === 'admin') {
        return true;
      }
      router.navigate(['/home']);
      return false;
    })
  )
};
