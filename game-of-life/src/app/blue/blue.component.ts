import { Component } from '@angular/core';
import { Unit } from '../types';
import { groupBy } from 'lodash';
import { RedComponent } from '../red/red.component';

@Component({
  selector: 'app-blue',
  templateUrl: './blue.component.html',
  styleUrls: ['./blue.component.scss']
})
export class BlueComponent implements Unit {

  constructor() { }
  rule(neighbours: Unit[]): Unit {
    const group = neighbours.filter((n) => n instanceof BlueComponent);
    if (group.length > 1 && group.length < 4) {
      return new BlueComponent();
    }
    return new RedComponent();
  }

  ngOnInit(): void {
  }

}
