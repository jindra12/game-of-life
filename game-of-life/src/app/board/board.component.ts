import { Component, OnInit } from '@angular/core';
import { CustomSubmitEvent, Unit } from '../types';

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
  
  private boardSize: number = 50;
  private ms: number = 100;
  private interval: number | undefined; 

  constructor() { }

  ngOnInit(): void {}

  updateBoard = (rules: CustomSubmitEvent) => {
    if (rules.boardSize !== this.boardSize || !this.board.length) {
      this.boardSize = rules.boardSize;
      this.generateBoard();
    }
    if (rules.ms !== this.ms) {
      if (this.interval && this.running) {
        window.clearInterval(this.interval);
        this.interval = window.setInterval(this.runGame, this.ms);
      }
      this.ms = rules.ms;
    }
    this.running = rules.running;
    if (!this.running && this.interval !== undefined) {
      window.clearInterval(this.interval);
    }
    if (this.running) {
      if (this.interval && this.interval !== undefined) {
        window.clearInterval(this.interval);
      }
      this.interval = window.setInterval(this.runGame, this.ms);
    }
  }

  private generateBoard = () => {
    this.board = [];
    for (let i = 0; i < this.boardSize; i++) {
      this.board.push([]);
      for (let j = 0; j < this.boardSize; j++) {
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
