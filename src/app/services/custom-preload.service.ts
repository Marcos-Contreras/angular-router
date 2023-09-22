// THIS SERVICE ALLOWS TO SPECIFY WHETHER A MODULE SHOULD BE PRELOADED OR NOT

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadService implements PreloadingStrategy {

  constructor() { }

  preload(route: Route, load: ()=> Observable<any>): Observable<any> {
    if(route.data && route.data['preload']) {
      return load();
    }
    return of(null);
  }
}
