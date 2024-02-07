import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';


import { ApiService } from '../services/api.service';
import { Blessing } from '../models/blessing';
import { NgForOf } from '@angular/common';
import { HighlightPipe } from '../pipes/highlight.pipe';


@Component({
  selector: 'app-blessings',
  standalone: true,
  imports: [NgForOf, MatInputModule, HighlightPipe],
  templateUrl: './blessings.component.html',
  styleUrl: './blessings.component.scss'
})
export class BlessingsComponent {

  blessings: Blessing[] = [];
  filteredBlessings: Blessing[] = [];
  filterString: string = '';
  constructor(
    private api: ApiService
  ) { 
    this.api.getAllBlessings().subscribe((blessings) => {
      this.blessings = blessings;
      this.filteredBlessings = this.blessings;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      this.filteredBlessings = this.blessings;
      return;
    }
    this.filterString = filterValue;
    this.filteredBlessings = this.blessings.filter(blessing => 
      blessing.blessing.toLowerCase().includes(filterValue.toLowerCase()));
  }
}
