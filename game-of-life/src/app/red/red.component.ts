import { Component, OnInit } from '@angular/core';
import { PurpleComponent } from '../purple/purple.component';
import { Unit } from '../types';

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.scss']
})
export class RedComponent implements Unit {

  constructor() { }
  rule(neighbours: Unit[]): Unit {
    if (neighbours.filter(n => n instanceof PurpleComponent).length > 1) {
      return new PurpleComponent();
    }
    return new RedComponent();
  }

  ngOnInit(): void {
  }

}
