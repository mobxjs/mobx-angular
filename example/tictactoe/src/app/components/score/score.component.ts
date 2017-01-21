import { Component, OnInit } from '@angular/core';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'ttt-score',
  template: `
    <div *mobxAutorun>
      <p>X: {{game.score.X}}</p>
      <p>O: {{game.score.O}}</p>
    </div>
  `,
  styles: []
})
export class ScoreComponent implements OnInit {

  constructor(private game:GameService) { }

  ngOnInit() {
  }

}
