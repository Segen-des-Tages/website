import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { environment } from '../../environments/environment';

import { ApiService } from '../services/api.service';
import { IntegrationsService } from '../services/integrations.service';
import { DatePipe, NgIf, NgFor } from '@angular/common';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import {MatButtonModule} from '@angular/material/button';


import {MatTooltipModule} from '@angular/material/tooltip';
import { Platform } from '../models/platform';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, ShareButtonsModule, ShareIconsModule, MatButtonModule, MatTooltipModule, NgIf, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  blessingOfTheDay = 'Segen des Tages';
  date: Date = new Date();
  shareURL: string = 'https://www.segen-des-tages.de';
  shareTitle: string = 'Segen des Tages';
  numberOfActiveIntegrations: number = 0;
  activeIntegrations: Platform[] = [];
  constructor(
    private api: ApiService,
    private integrations: IntegrationsService,
    private route: ActivatedRoute,
    private titleService: Title
    ) { 
      this.api.load();
      this.integrations.load();
  } 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const dateForBlessing = params['date'] ? params['date'] : new Date().toISOString().split('T')[0];
      this.blessingOfTheDay = this.api.getBlessingByDate(dateForBlessing).blessing;
      this.date = dateForBlessing;
      this.titleService.setTitle(this.createTitle(dateForBlessing));
      this.shareTitle = this.createTitle(dateForBlessing);
      this.shareURL = 'https://www.segen-des-tages.de/' + dateForBlessing;
    });
    this.activeIntegrations = this.integrations.getActivePlatforms();
    this.numberOfActiveIntegrations = this.activeIntegrations.length;
  }
  private createTitle(date: string): string {
    const dateStr = date.split('-');
    const yyyy = dateStr[0];
    const mm = dateStr[1];
    const dd = dateStr[2];
    return environment.title + ' | ' + dd + '.' + mm + '.' + yyyy;
  }
}
