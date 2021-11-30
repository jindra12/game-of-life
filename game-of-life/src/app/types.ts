import { OnInit } from "@angular/core";

export interface Unit extends OnInit {
    rule(neighbours: Unit[]): Unit;
}