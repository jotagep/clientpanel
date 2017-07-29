import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';

import 'rxjs/add/operator/switchMap';
import { Client } from '../../models/Client';

import { SettingsService } from './../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnEdit = true;


  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService,
    private settingService: SettingsService
  ) {

  }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingService.getSettings().disableBalanceOnEdit;
    this.id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit(valid: boolean) {
    if (!valid) {
      this.flashMessages.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 4000 });

    } else {
      this.clientService.updateClient(this.client);
      this.flashMessages.show('Client updated', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/client/' + this.id]);
    }
  }

}
