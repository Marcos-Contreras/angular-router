import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  showMenu: boolean = false;
  counter = 0;
  token = '';
  profile: User | null = null;

  constructor(
    private storeService: StoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  toggleMenu (){
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
  }

  login() {
    this.authService.login('andres@mail.com', '12345678')
    .subscribe(response => {
      this.token = response.access_token;
      console.log(this.token);
      this.getProfile();
    });
  }

  getProfile() {
    this.authService.profile()
    .subscribe(user => {
      this.profile = user;
    });
  }
}
