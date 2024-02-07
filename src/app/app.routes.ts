import { Routes } from '@angular/router';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { AboutComponent } from './about/about.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { BlessingsComponent } from './blessings/blessings.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SupportComponent } from './support/support.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path : 'home', component: HomeComponent },
  { path : 'home/:date', component: HomeComponent},
  { path : 'ueber', component: AboutComponent },
  { path : 'helfen', component: SupportComponent},
  { path : 'kontakt', component: ContactComponent },
  { path : 'kalender', component: CalendarComponent },
  { path : 'kalender/:date', component: CalendarComponent},
  { path : 'alle', component: BlessingsComponent},
  { path:  'suche/', component: SearchResultsComponent},
  { path:  'suche/:search', component: SearchResultsComponent},
  { path : 'impressum', component: ImpressumComponent },
  { path : 'datenschutz', component: DatenschutzComponent },
  { path : '**', component: NotFoundComponent }

];
