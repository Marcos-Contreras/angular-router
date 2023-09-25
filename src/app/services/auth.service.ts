import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';
import { tap } from 'rxjs/operators';
import { TokenService } from './../services/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.API_URL + '/api/v1/auth'
  // VARIABLE BEHAVIOR CREATION
  private user = new BehaviorSubject<User | null>(null);
  // SET THE VARIABLE SO OTHER COMPONENTS CAN SUSCRIBE TO IT
  user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(this.apiUrl + '/login', {email, password})
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token)
      })
    );
  }

  profile() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(this.apiUrl + '/profile')
      // headers: {
      //   Authorization: 'Bearer ' + token
      // }
    .pipe(
      tap(user => this.user.next(user))
    );
  }

  logout() {
    this.tokenService.removeToken();
  }
}
