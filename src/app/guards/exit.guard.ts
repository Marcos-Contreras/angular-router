import { CanDeactivateFn } from '@angular/router';


export const exitGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

  const answ = confirm('Are you sure you want to leave this page?');
  return answ;
};
