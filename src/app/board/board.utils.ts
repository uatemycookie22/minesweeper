export interface Square {
    isMine: boolean;
    isRevealed: boolean;
    surroundingMines: number;
    position: Coordinates;
}

export interface BoardDimensions extends Coordinates {}

export interface Coordinates {
    x: number;
    y: number;
}

  