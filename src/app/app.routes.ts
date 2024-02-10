import { Routes } from '@angular/router';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BlessingsComponent } from './blessings/blessings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SupportComponent } from './support/support.component';

import { environment } from './../environments/environment';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path : 'home', component: HomeComponent, title: environment.title},
  { path : 'home/:date', component: HomeComponent, title: environment.title},
  { path : 'ueber', component: AboutComponent, title: environment.title + ' | Über das Projekt'},
  { path : 'helfen', component: SupportComponent, title: environment.title + ' | Helfen'},
  { path : 'kontakt', component: ContactComponent, title: environment.title + ' | Kontakt'},
  { path : 'kalender', component: CalendarComponent, title: environment.title + ' | Kalender'},
  { path : 'alle', component: BlessingsComponent, title: environment.title + ' | Alle Segenssprüche'},
  { path : 'alle/:filter', component: BlessingsComponent, title: environment.title + ' | Alle Segenssprüche'},
  { path : 'impressum', component: ImpressumComponent, title: environment.title + ' | Impressum'},
  { path : 'datenschutz', component: DatenschutzComponent, title: environment.title + ' | Datenschutz'},
  { path : '**', component: NotFoundComponent, title: environment.title + ' | 404'}

];
