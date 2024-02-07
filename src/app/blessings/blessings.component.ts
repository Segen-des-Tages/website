import { Component } from '@angular/core';


import { ApiService } from '../services/api.service';
import { Blessing } from '../models/blessing';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-blessings',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './blessings.component.html',
  styleUrl: './blessings.component.scss'
})
export class BlessingsComponent {

  blessings: Blessing[] = [];
  constructor(
    private api: ApiService
  ) { 
    this.api.getAllBlessings().subscribe((blessings) => {
      this.blessings = blessings;
    });
  }
}
