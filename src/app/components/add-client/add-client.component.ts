import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { SettingsService } from './../../services/settings.service';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  disableBalanceOnAdd = true;

  constructor(private flashMessages: FlashMessagesService,
              private router: Router,
              private clientService: ClientService,
              private settingService: SettingsService) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingService.getSettings().disableBalanceOnAdd;
  }

  onSubmit(valid: boolean) {
    if (this.disableBalanceOnAdd) {
      this.client.balance = 0;
    }
    if (!valid) {
      this.flashMessages.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 4000 });

    } else {
      this.clientService.newClient(this.client);
      this.flashMessages.show('New client added', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }

}
