import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Platform } from '../models/platform';
import { Module } from '../models/module';
import { Plugin } from '../models/plugin';


@Injectable({
  providedIn: 'root'
})
export class IntegrationsService {
  public integrationsUrl = environment.integrationsUrl;
  public validCacheTime: number = environment.cacheTime;

  constructor(private http: HttpClient) { }

  public getPlatforms(): Observable<Platform[]> {
    const platformsCache = localStorage.getItem('platforms');
    const cacheTime = localStorage.getItem('platformsCacheTime');
    const isCacheValid = cacheTime && (new Date().getTime() - new Date(parseInt(cacheTime)).getTime()) < this.validCacheTime; 

    if (platformsCache && isCacheValid) {
      return of(JSON.parse(platformsCache));
    } else {
      return this.http.get<Platform[]>(`${this.integrationsUrl}/platforms.json`).pipe(
        tap(platforms => {
          localStorage.setItem('platforms', JSON.stringify(platforms));
          localStorage.setItem('platformsCacheTime', new Date().getTime().toString());
        }),
        catchError(error => {
          console.error('Error loading platforms', error);
          return throwError(error);
        })
      );
    }
  }

  public getModules(): Observable<Module[]> {
    const modulesCache = localStorage.getItem('modules');
    const cacheTime = localStorage.getItem('modulesCacheTime');
    const isCacheValid = cacheTime && (new Date().getTime() - new Date(parseInt(cacheTime)).getTime()) < this.validCacheTime; 

    if (modulesCache && isCacheValid) {
      return of(JSON.parse(modulesCache));
    } else {
      return this.http.get<Module[]>(`${this.integrationsUrl}/modules.json`).pipe(
        tap(modules => {
          localStorage.setItem('modules', JSON.stringify(modules));
          localStorage.setItem('modulesCacheTime', new Date().getTime().toString());
        }),
        catchError(error => {
          console.error('Error loading modules', error);
          return throwError(error);
        })
      );
    }
  }

  public getPlugins(): Observable<Plugin[]> {
    const pluginsCache = localStorage.getItem('plugins');
    const cacheTime = localStorage.getItem('pluginsCacheTime');
    const isCacheValid = cacheTime && (new Date().getTime() - new Date(parseInt(cacheTime)).getTime()) < this.validCacheTime; 

    if (pluginsCache && isCacheValid) {
      return of(JSON.parse(pluginsCache));
    } else {
      return this.http.get<Plugin[]>(`${this.integrationsUrl}/plugins.json`).pipe(
        tap(plugins => {
          localStorage.setItem('plugins', JSON.stringify(plugins));
          localStorage.setItem('pluginsCacheTime', new Date().getTime().toString());
        }),
        catchError(error => {
          console.error('Error loading plugins', error);
          return throwError(error);
        })
      );
    }
  }
}
