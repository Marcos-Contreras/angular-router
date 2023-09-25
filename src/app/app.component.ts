import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';


@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImage = true;
  token = '';
  uploadedImg = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
    console.log('ACTUAAAL');
    console.log(token);


    if(token) {
      this.authService.profile()
      .subscribe()
    }
  }

  // EVENT THAT RECEIVES THE IMAGE URL FROM CHILD COMPONENT
  onLoaded(img: string) {
    console.log('log parent');
    console.log(img);

  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  createUser() {
    this.usersService.create({
      name: 'Andres',
      email: 'andres@mail.com',
      password: '12345678',
      avatar: 'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png',
      role: 'customer'
    })
    .subscribe(response => {
      console.log(response);
    });
  }

  login() {
    this.authService.login('andres@mail.com', '12345678')
    .subscribe(response => {
      console.log(response.access_token);
      this.token = response.access_token;
    });
  }

  getProfile() {
    this.authService.profile()
    .subscribe(response => {
      console.log(response);
    });
  }

  downloadPdf() {
    this.filesService.getFile('myfile.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file) {
      this.filesService.uplodadFile(file)
      .subscribe(response => {
        this.uploadedImg = response.location;
      });
    }
  }
}
