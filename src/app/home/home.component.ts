import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { environment } from '../../environments/environment';

import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import {MatButtonModule} from '@angular/material/button';


import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, ShareButtonsModule, ShareIconsModule, MatButtonModule, MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  blessingOfTheDay = 'Segen des Tages';
  date: Date = new Date();
  shareURL: string = 'https://www.segen-des-tages.de';
  shareTitle: string = 'Segen des Tages';
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private titleService: Title
    ) { 

  } 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const dateForBlessing = params['date'] ? params['date'] : new Date().toISOString().split('T')[0];
      this.api.getBlessingByDate(dateForBlessing).subscribe((blessing) => {
        this.blessingOfTheDay = blessing.blessing;
        this.date = dateForBlessing;
        this.titleService.setTitle(this.createTitle(dateForBlessing));
        this.shareTitle = this.createTitle(dateForBlessing);
        this.shareURL = 'https://www.segen-des-tages.de/' + dateForBlessing;
      })
    });
  }
  private createTitle(date: string): string {
    const dateStr = date.split('-');
    const yyyy = dateStr[0];
    const mm = dateStr[1];
    const dd = dateStr[2];
    return environment.title + ' | ' + dd + '.' + mm + '.' + yyyy;
  }
}
