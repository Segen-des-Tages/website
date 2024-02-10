import { DatePipe, NgClass, NgForOf } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';

import {MatListModule} from '@angular/material/list';

import { ApiService } from '../services/api.service';
import { Blessing } from '../models/blessing';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatListModule, NgForOf, DatePipe, NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements AfterViewInit {
  blessings: Blessing[] = [];
  year: number = new Date().getFullYear();
  today: Date = new Date();

  constructor(
    private api: ApiService
  ) { 
    this.api.load();
    this.blessings = this.api.getBlessingCalender(this.year);
  }

  isToday(date: Date): boolean {
    const d = new Date(date);
    return d.getDate() === this.today.getDate() &&
      d.getMonth() === this.today.getMonth() && 
      d.getFullYear() === this.today.getFullYear();
  }
  ngAfterViewInit() {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    const elementId = `blessing-${dateString}`;
    const element = document.getElementById(elementId);
    element?.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}
