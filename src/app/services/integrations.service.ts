import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Platform } from '../models/platform';
import { Module } from '../models/module';
import { Plugin } from '../models/plugin';
import { resolve } from 'path';


@Injectable({
  providedIn: 'root'
})
export class IntegrationsService {
  private integrationsUrl = environment.integrationsUrl;
  private validCacheTimeinMilliseconds: number = environment.cacheTime;
  private platformsCache: string = '';
  private modulesCache: string = '';
  private pluginsCache: string = '';
  private timeofCacheInUnixTime: number = 0;
  private platforms: Platform[] = [];
  private modules: Module[] = [];
  private plugins: Plugin[] = [];

  constructor(private http: HttpClient) { 

  }

  private isCacheValid(): boolean {
    return (new Date().getTime() - new Date(this.timeofCacheInUnixTime).getTime()) < this.validCacheTimeinMilliseconds; 
  }
  private loadCacheFromLocalStorage(): void {
    if (localStorage.getItem('timeofCacheInUnixTime')) {
      this.timeofCacheInUnixTime = parseInt(localStorage.getItem('timeofCacheInUnixTime') || '') || 0;
    } else {
      this.timeofCacheInUnixTime = new Date().getTime();
    }
    this.platformsCache = localStorage.getItem('platformsCache') || '';
    this.modulesCache = localStorage.getItem('modulesCache') || '';
    this.pluginsCache = localStorage.getItem('pluginsCache') || '';
  }

  public async load(): Promise<void> {
    this.loadCacheFromLocalStorage();
    if (!this.isCacheValid()) {
      let platformsAsString = await this.loadPlatformsFromServer();
      localStorage.setItem('platformsCache', platformsAsString);
      this.platforms = JSON.parse(platformsAsString);
      let modulesAsString = await this.loadModulesFromServer();
      localStorage.setItem('modulesCache', modulesAsString);
      this.modules = JSON.parse(modulesAsString);
      let pluginsAsString = await this.loadPluginsFromServer();
      localStorage.setItem('pluginsCache', pluginsAsString);
      this.plugins = JSON.parse(pluginsAsString);
    }
    resolve();
  }
  private loadPlatformsFromServer(): Promise<string> {
    return this.http.get<Platform[]>(`${this.integrationsUrl}/platforms.json`).toPromise().then(platforms => {
      this.platformsCache = JSON.stringify(platforms);
      return this.platformsCache;
    });
  }
  private loadModulesFromServer(): Promise<string> {
    return this.http.get<Module[]>(`${this.integrationsUrl}/modules.json`).toPromise().then(modules => {
      this.modulesCache = JSON.stringify(modules);
      return this.modulesCache;
    });
  }
  private loadPluginsFromServer(): Promise<string> {
    return this.http.get<Plugin[]>(`${this.integrationsUrl}/plugins.json`).toPromise().then(plugins => {
      this.pluginsCache = JSON.stringify(plugins);
      return this.pluginsCache;
    });
  }

  public getPlatforms(): Platform[] {
    return this.platforms;
  }

  public getActivePlatforms(): Platform[] {
    return this.platforms.filter(platform => platform.status === 'active');
  }

  public getModules(): Module[] {
    return this.modules
  }

  public getPlugins(): Plugin[] {
    return this.plugins;
  }
}
