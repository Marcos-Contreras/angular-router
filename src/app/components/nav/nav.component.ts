import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  showMenu: boolean = false;

  toggleMenu (){
    this.showMenu = !this.showMenu;
    console.log(this.showMenu);

  }
}
