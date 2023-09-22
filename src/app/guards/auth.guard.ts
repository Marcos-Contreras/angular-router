import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';

export const authGuard = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const token = tokenService.getToken();
  if(! token) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
