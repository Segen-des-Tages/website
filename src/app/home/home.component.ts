import { Component } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  blessingOfTheDay = 'Segen des Tages';
  constructor(
    private api: ApiService
  ) { 
    this.api.getBlessingOfTheDay().subscribe((blessing) => {
      this.blessingOfTheDay = blessing.blessing;
    });
  }
}
// TODO: if a date is passed, get the blessing for that date instead of the current date