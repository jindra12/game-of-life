import { Component } from '@angular/core';
import { GreenComponent } from '../green/green.component';
import { Unit } from '../types';

@Component({
  selector: 'app-purple',
  templateUrl: './purple.component.html',
  styleUrls: ['./purple.component.scss']
})
export class PurpleComponent implements Unit {

  constructor() { }
  rule(neighbours: Unit[]): Unit {
    if (neighbours.filter(n => n instanceof PurpleComponent).length > 2) {
      return new GreenComponent();
    }
    return new PurpleComponent();
  }

  ngOnInit(): void {
  }

}
