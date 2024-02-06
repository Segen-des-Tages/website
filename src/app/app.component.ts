import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {  NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    MatIconModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule,
    MatButtonModule, 
    RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  version = '1.0.0';
  title = 'website';
}
