import { Component, OnInit } from '@angular/core';
import { Unit } from '../types';

class BlueUnit implements Unit {
  className = "board-unit board-unit--blue";
  rule = (neighbours: Unit[]): Unit => {
    const group = neighbours.filter((n) => n instanceof BlueUnit);
    if (group.length > 1 && group.length < 4) {
      return new BlueUnit();
    }
    return new RedUnit();
  }
}

class RedUnit implements Unit {
  className = "board-unit board-unit--red";
  rule = (neighbours: Unit[]): Unit => {
    if (neighbours.filter(n => n instanceof PurpleUnit).length > 1) {
      return new PurpleUnit();
    }
    return new RedUnit();
  }
}

class GreenUnit implements Unit {
  className = "board-unit board-unit--green";
  rule = (neighbours: Unit[]): Unit => {
    if (neighbours.filter(n => n instanceof GreenUnit).length < 4) {
      return new BlueUnit();
    }
    return new GreenUnit();
  }
}

class PurpleUnit implements Unit {
  className = "board-unit board-unit--purple";
  rule = (neighbours: Unit[]): Unit => {
    if (neighbours.filter(n => n instanceof PurpleUnit).length > 2) {
      return new GreenUnit();
    }
    return new PurpleUnit();
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board: Unit[][] = [];
  running: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const boardSize = 50;
    for (let i = 0; i < boardSize; i++) {
      this.board.push([]);
      for (let j = 0; j < boardSize; j++) {
        this.board[i][j] = (() => {
          switch (Math.floor(Math.random() * 4)) {
            case 0:
              return new BlueUnit();
            case 1:
              return new RedUnit();
            case 2:
              return new GreenUnit();
            case 3:
              return new PurpleUnit();
            default:
              throw new Error("Should never happen");
          }
        })();
      }
    }
  }

  run = () => {
    if (!this.running) {
      this.interval = window.setInterval(this.runGame, 100); 
    } else if (this.interval) {
      window.clearInterval(this.interval);
    }
    this.running = !this.running;
  }

  private interval: number | undefined; 

  private runGame = () => {
    const neighbours = [-1, 0, 1];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        const unit = this.board[i][j];
        const neighbouringUnits: Unit[] = [];
        neighbours.forEach(x => {
          neighbours.forEach(y => {
            if ((x !== 0 || y !== 0) && this.board[i + x]?.[j + y]) {
              neighbouringUnits.push(this.board[i + x][j + y]);
            }
          });
        });
        this.board[i][j] = unit.rule(neighbouringUnits);
      }
    }
  };
}
