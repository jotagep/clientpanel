import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

import { AuthService } from './../../services/auth.service';
import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private flashMessages: FlashMessagesService,
    private router: Router,
    private authService: AuthService,
    private settingService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingService.getSettings().allowRegistration;
  }

  onLogout() {
    this.authService.logout();
    this.flashMessages.show('You are logged out', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/login']);
  }

}
