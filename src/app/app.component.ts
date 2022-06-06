import { Component } from '@angular/core';
import { BoardDimensions } from './board/board.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Minesweeper';
  boardDimensions: BoardDimensions = {x: 10, y: 10}
}
