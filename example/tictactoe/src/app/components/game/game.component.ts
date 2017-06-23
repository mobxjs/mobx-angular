import { Component, OnInit } from '@angular/core';
import { GameStore } from 'app/services/game.store';

@Component({
  selector: 'ttt-game',
  template: `
    <ttt-controls></ttt-controls>
    <ttt-board></ttt-board>
    <ttt-score></ttt-score>
  `,
  styles: [],
  providers: [GameStore]
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
