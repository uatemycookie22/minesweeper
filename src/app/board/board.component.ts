import { Component, Input, OnInit } from '@angular/core';
import { BoardDimensions, Coordinates, Square } from './board.utils';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  @Input() gameActive?: boolean
  @Input() dimensions!: BoardDimensions

  squares: Square[] = []
  mines: Coordinates[] = []

  constructor() {
    
  }

  ngOnInit(): void {
    for(let i = 0; i < this.dimensions.x*this.dimensions.y; ++i){
      let x = i%this.dimensions.x
      let y = Math.floor(i/this.dimensions.x)
      this.squares[i] = {
          isMine: false,
          isRevealed: false,
          surroundingMines: 0,
          position: {x: x, y: y},
        }
    }

    for(let i = 0; i < 10; ++i){
      this.mines.push({ x: Math.floor(Math.random()*10), y: Math.floor(Math.random()*10)})
      this.findSquare(this.mines[i]).isMine = true
    }
  }

  findSquare(position: Coordinates): Square {
    return this.squares[position.y*this.dimensions.y + position.x]
  }

  getSurrounding(square: Square) {
    const squares: Square[] = []

    for(let i = -1; i <= 1; i++) {
      for(let j = -1; j <= 1; j++) {
        const x = square.position.x + i
        const y = square.position.y + j
        const isSame = x == square.position.x && y == square.position.y

        if(x >= 0 && x < this.dimensions.x && y >= 0 && y < this.dimensions.y && !isSame) {
          squares.push(this.findSquare({x: x, y: y}))
        }
      }
    }
    return squares
  }
  
  revealBlanks(squares: Square[]){
    /*
    if (squares.length <= 1) {
      return
    } else {
      squares.
    }
    */
  }

  onClick(event: MouseEvent, square: Square){
    square.isRevealed = true

    if (square.isMine) {
      this.gameActive = false
    }

    const surrounding = this.getSurrounding(square)
    this.revealBlanks(surrounding)

    square.surroundingMines = surrounding.filter( surroundingSquare => surroundingSquare.isMine ).length
  }
}
