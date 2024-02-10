import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Blessing } from '../models/blessing';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private backendUrl = environment.backendUrl;
  private validCalendarCacheTime: number = environment.validCalendarCacheTime;
  private calendarCache: string = '';
  private blessingsCache: string = '';
  private cacheTime: number = 0;
  private calendar: Blessing[] = [];
  private blessings: Blessing[] = [];
  constructor(
    private http: HttpClient
  ) {
    
  }

  public getBlessingByDate(date: string): Blessing {
    let blessing = this.calendar.find(blessing => blessing.date === date)
    if (blessing) {
      return blessing;
    } else {
      throw new Error('Invalid date format or date not found in calendar');
    }
  }
  public getAllBlessings(): Blessing[] {
    return this.blessings;
  }

  public getBlessingCalender(year: number): Blessing[] {
    let blessings = this.calendar.filter(blessing => new Date(blessing.date).getFullYear() === year);
    if (blessings) {
      return blessings;
    } else {
      throw new Error('Invalid year format or year not found in calendar');
    }
  }
  public async load(): Promise<void> {
    await this.fillCache();
    if (!this.isCacheValid()) {
      this.calendarCache = await this.loadCalendarFromServer();
      this.blessingsCache = await this.loadBlessingsFromServer();
    }
    this.fillArraysFromCache();
  }
  private async fillCache(): Promise<void> {
    if (localStorage.getItem('calendarCacheTime')) {
      this.cacheTime = parseInt(localStorage.getItem('calendarCacheTime') || '') || 0;
    } else {
      this.cacheTime = 0;
    }
    if (localStorage.getItem('calendarCache')) {
      this.calendarCache = localStorage.getItem('calendarCache') || '';
    } else {
      this.calendarCache = await this.loadCalendarFromServer();
    }
    if (localStorage.getItem('blessingsCache')) {
      this.blessingsCache = localStorage.getItem('blessingsCache') || '';
    } else {
      this.blessingsCache = await this.loadBlessingsFromServer();
    }
  }
  private fillArraysFromCache(): void {
    this.calendar = this.cacheToBlessings(this.calendarCache);
    this.blessings = this.cacheToBlessings(this.blessingsCache);
  }

  private isCacheValid(): boolean {
    return (new Date().getTime() - new Date(this.cacheTime).getTime()) < this.validCalendarCacheTime;
  }
  private cacheToBlessings(cache: string): Blessing[] {
    return JSON.parse(cache);
  }
  private async loadBlessingsFromServer(): Promise<string> {
    return new Promise<string>((resolve) => {
      this.http.get<Blessing[]>(`${this.backendUrl}/blessings/language/de`).subscribe((data) => {
        this.blessingsCache = JSON.stringify(data);
        resolve(this.blessingsCache);
      });
    });
  }
  private async loadCalendarFromServer(): Promise<string> {
    let year = new Date().getFullYear();
    return new Promise<string>((resolve) => {
      this.http.get<Blessing[]>(`${this.backendUrl}/blessings/year/${year}`).subscribe((calendar) => {
        this.calendarCache = JSON.stringify(calendar);
        resolve(this.calendarCache);
      });
    });
  }
}
