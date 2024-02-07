import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';

import { ShareModule } from 'ngx-sharebuttons';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, ShareModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  blessingOfTheDay = 'Segen des Tages';
  date: Date;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute
  ) { 
    this.date = new Date();
    this.route.params.subscribe(params => {
      const date = params['date'];
      if (date) {
        this.api.getBlessingByDate(date).subscribe((blessing) => {
          this.blessingOfTheDay = blessing.blessing;
          this.date = blessing.date;
        });
      } else {
        this.api.getBlessingOfTheDay().subscribe((blessing) => {
          this.blessingOfTheDay = blessing.blessing;
          this.date = blessing.date;
        });
      }
    });
  }
}
// TODO: if a date is passed, get the blessing for that date instead of the current date