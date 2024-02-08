import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Platform } from '../models/platform';

@Injectable({
  providedIn: 'root'
})
export class IntegrationsService {
  public integrationsUrl = environment.integrationsUrl;
  constructor(
    private http: HttpClient
  ) { 

  }
  public getPLatforms(): Observable<Platform[]> {
    return this.http.get<Platform>(`${this.integrationsUrl}/platforms.json`);
  }
}
