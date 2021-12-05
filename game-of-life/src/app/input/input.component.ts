import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomSubmitEvent } from '../types';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() { }

  @Input()
  running: boolean = false;

  @Output()
  runEvent = new EventEmitter<CustomSubmitEvent>();

  changeState(ms: CustomSubmitEvent["ms"], boardSize: CustomSubmitEvent["boardSize"], running: CustomSubmitEvent["running"]) {
    if (!ms || !boardSize) {
      window.alert('Values in form must be non zero and defined');
      return;
    }
    if (ms <= 0 || boardSize <= 0) {
      window.alert('Values in form must be greater than 0');
      return;
    }
    this.runEvent.emit({
      ms, boardSize, running
    });
  }

  ngOnInit(): void {
  }

}
