export interface Unit {
    className: string;
    rule(neighbours: Unit[]): Unit;
}