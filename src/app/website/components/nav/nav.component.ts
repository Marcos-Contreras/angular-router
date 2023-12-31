import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { CategoriesService  } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { Router } from '@angular/router';

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
  categories: Category[] = [];

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });

    this.getAllCategories();

    this.authService.user$
    .subscribe(response => {
      this.profile = response
    })
  }

  toggleMenu (){
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);
  }

  login() {
    this.authService.login('admin@mail.com', 'admin123')
    .subscribe(response => {
      this.token = response.access_token;
      console.log(this.token);
      this.getProfile();
      this.router.navigate(['/profile']);
    });
  }

  getProfile() {
    this.authService.profile()
    .subscribe(user => {
      this.profile = user;
    });
  }

  getAllCategories() {
    this.categoriesService.getAll()
    .subscribe(response => {
      this.categories = response;
    });
  }

  logout() {
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }
}
