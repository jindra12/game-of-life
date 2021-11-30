import { Component, OnInit } from '@angular/core';
import { BlueComponent } from '../blue/blue.component';
import { GreenComponent } from '../green/green.component';
import { PurpleComponent } from '../purple/purple.component';
import { RedComponent } from '../red/red.component';
import { Unit } from '../types';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board: Unit[][] = [];

  constructor() { }

  ngOnInit(): void {
    let iterations = 0;
    const maxIterations = 10000;
    const intervalSize = 100;
    const boardSize = 50;
    for (let i = 0; i < boardSize; i++) {
      this.board.push([]);
      for (let j = 0; j < boardSize; j++) {
        this.board[i][j] = (() => {
          switch (Math.floor(Math.random() * 5)) {
            case 0:
              return new BlueComponent();
            case 1:
              return new RedComponent();
            case 2:
              return new GreenComponent();
            case 3:
              return new PurpleComponent();
            default:
              throw new Error("Should never happen");
          }
        })();
      }
    }
    const interval = setInterval(() => {
      if (iterations === maxIterations) {
        clearInterval(interval);
      }
      const neighbours = [-1, 0, 1];
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          const unit = this.board[i][j];
          const neighbouringUnits: Unit[] = [];
          neighbours.forEach(x => {
            neighbours.forEach(y => {
              if (x !== 0 && y !== 0 && this.board[i + x][j + y]) {
                neighbouringUnits.push(this.board[i + x][j + y]);
              }
            });
          });
          this.board[i][j] = unit.rule(neighbouringUnits);
        }
      }
    }, intervalSize);
  }

}
