import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.services';
import { User } from '../_models/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    user: User;
    constructor(private accountService: LoginService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
    logout() {
        this.accountService.logout();
    }
}
