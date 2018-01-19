import { Component, OnInit } from '@angular/core';
import { GameStore } from 'app/services/game.store';

@Component({
  selector: 'ttt-board',
  template: `
    <table *mobxAutorun>
      <tr *ngFor="let row of game.board; let i = index">
        <td *ngFor="let cell of row; let j = index">
          <ttt-cell [value]="cell" [nextValue]="game.currentPlayer" (select)="playCell(i,j)"></ttt-cell>
        </td>
      </tr>
    </table>
  `,
  styles: []
})
export class BoardComponent implements OnInit {
  constructor(public game: GameStore) { }

  ngOnInit() {
  }
  playCell(i, j) {
    if (this.game.board[i][j]) {
      alert('Please choose an empty cell!');
    } else {
      this.game.play(i, j);
    }
  }
}
