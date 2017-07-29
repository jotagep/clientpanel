import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SettingsService } from './../../services/settings.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from './../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    private flashMessages: FlashMessagesService,
    private settingService: SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings();
    console.log(this.settings);
  }

  onSubmit() {
    this.settingService.changeSettings(this.settings);
    this.flashMessages.show('Settings updated!', { cssClass: 'alert-success', timeout: 4000 });
  }

}
