import { Component } from '@angular/core';
import { LoginService } from './_services/login.services';
import { User } from './_models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-test';
  user: User;

  constructor(private loginService: LoginService) {
    this.loginService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.loginService.logout();
  }
}
