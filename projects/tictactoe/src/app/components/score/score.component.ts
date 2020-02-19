import { Component, OnInit } from '@angular/core';
import { GameStore } from '../../services/game.store';

@Component({
  selector: 'ttt-score',
  template: `
    <div *mobxAutorun>
      <p>X: {{ game.score.X }}</p>
      <p>O: {{ game.score.O }}</p>
    </div>
  `,
  styles: []
})
export class ScoreComponent implements OnInit {
  constructor(public game: GameStore) {}

  ngOnInit() {}
}
