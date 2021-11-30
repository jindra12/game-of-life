import { Component, OnInit } from '@angular/core';
import { BlueComponent } from '../blue/blue.component';
import { Unit } from '../types';

@Component({
  selector: 'app-green',
  templateUrl: './green.component.html',
  styleUrls: ['./green.component.scss']
})
export class GreenComponent implements Unit {

  constructor() { }
  rule(neighbours: Unit[]): Unit {
    if (neighbours.filter(n => n instanceof GreenComponent).length < 1) {
      return new BlueComponent();
    }
    return new GreenComponent();
  }

  ngOnInit(): void {
  }

}
