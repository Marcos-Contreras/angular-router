import { Component } from '@angular/core';

import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user: User | null = null;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // LISTENING TO THE user VARIABLE CHANGES IN AuthService SERVICE
    this.authService.user$
    .subscribe(response => {
      this.user = response;
    });
  }

}
