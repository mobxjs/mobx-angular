import { Injectable } from '@angular/core';
import { observable, action, computed, reaction } from 'mobx';

const OPONENT = {
  X: 'O',
  O: 'X'
};

@Injectable()
export class GameService {
  @observable board:string[][];
  @observable score = {X:0, O:0};
  @observable firstPlayer = 'X';

  constructor() {
    this.resetGame();
    this._countScore();
    this._changeStartingPlayer();
  }

  @computed get currentPlayer():string {
    return this.moves % 2 ? OPONENT[this.firstPlayer] : this.firstPlayer;
  }
  @computed get moves():number {
    return this.board[0].filter(cell => cell).length +
      this.board[1].filter(cell => cell).length +
      this.board[2].filter(cell => cell).length;
  };
  @computed get winner():string {
    console.log('winner', this._columnHasWinner(1));
    // rows:
    if (this._rowHasWinner(0)) return this.board[0][0];
    if (this._rowHasWinner(1)) return this.board[1][0];
    if (this._rowHasWinner(2)) return this.board[2][0];

    // columns:
    if (this._columnHasWinner(0)) return this.board[0][0];
    if (this._columnHasWinner(1)) return this.board[0][1];
    if (this._columnHasWinner(2)) return this.board[0][2];

    // diagonals
    if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) return this.board[0][0];
    if (this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) return this.board[0][2];

    return null;
  }
  @computed get tie():boolean {
    return this.moves === 9 && !this.winner;
  };
  @computed get ended():boolean {
    return this.winner || this.tie;
  }

  @action play(i,j) {
    if (this.ended) return;

    this.board[i][j] = this.currentPlayer;
  }

  @action resetGame() {
    this.board = [observable(new Array(3)), observable(new Array(3)), observable(new Array(3))];
  }

  private _rowHasWinner(index) {
    return (this.board[index][0] && this.board[index][0] === this.board[index][1] && this.board[index][1] === this.board[index][2]);
  }

  private _columnHasWinner(index) {
    return (this.board[0][index] && this.board[0][index] === this.board[1][index] && this.board[1][index] === this.board[2][index]);
  }

  private _countScore() {
    reaction(() => this.winner, (winner) => {
      if (winner) {
        this.score[winner]++;
      }
    })
  }

  private _changeStartingPlayer() {
    reaction(() => this.ended, (ended) => {
      if (ended) {
        this.firstPlayer = OPONENT[this.firstPlayer];
      }
    });
  }
}
