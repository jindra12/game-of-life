export interface Unit {
    className: string;
    rule(neighbours: Unit[]): Unit;
}

export interface CustomSubmitEvent {
    ms: number;
    boardSize: number;
    running: boolean;
}