import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private api: ApiService,
    private route: ActivatedRoute
  ) { 
    this.api.load();
    this.blessings = this.api.getAllBlessings();
    this.filteredBlessings = this.blessings;
    this.route.params.subscribe(params => {
      this.filterString = params['filter'] ? params['filter'] : '';
      this.applyFilterByString(this.filterString);
    });
  }

  applyFilterByString(filterValue: string) {
    this.filteredBlessings = this.blessings.filter(blessing => 
      blessing.blessing.toLowerCase().includes(filterValue.toLowerCase()));
  }

  applyFilterByEvent(event: Event) {
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
