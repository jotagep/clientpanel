import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';


@Injectable()
export class SettingsService {

  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false
  };

  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(): Settings {
    return this.settings;
  }

  changeSettings(newSettings: Settings) {
    this.settings = newSettings;
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }
}
