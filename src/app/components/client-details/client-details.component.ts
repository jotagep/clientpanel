import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';

import 'rxjs/add/operator/switchMap';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.clientService.getClient(this.id).subscribe(client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.showBalanceUpdateInput = false;
    this.flashMessages.show('Balance updated!', { cssClass: 'alert-success', timeout: 4000 });
  }

  onDelete() {
    if (confirm('Are you sure to delete?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessages.show('Client Deleted', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }

}
