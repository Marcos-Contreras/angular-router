import { CanActivateFn } from '@angular/router';

import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$
  .pipe(
    map(user => {
      if(! user) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  )
};
