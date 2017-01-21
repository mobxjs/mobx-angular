import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'ttt-game',
  template: `
    <ttt-controls></ttt-controls>
    <ttt-board></ttt-board>
    <ttt-score></ttt-score>
  `,
  styles: [],
  providers: [GameService]
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
