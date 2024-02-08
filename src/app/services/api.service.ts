import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Blessing } from '../models/blessing';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public backendUrl = environment.backendUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getBlessingByDate(date: string): Observable<Blessing> {
    return this.http.get<Blessing>(`${this.backendUrl}/de/${date}`);
  }
  public getAllBlessings(): Observable<Blessing[]> {
    return this.http.get<Blessing[]>(`${this.backendUrl}/blessings/language/de`);
  }

  public getBlessingCalender(year: number): Observable<Blessing[]> {
    return this.http.get<Blessing[]>(`${this.backendUrl}/blessings/year/${year}`);
  }
}
