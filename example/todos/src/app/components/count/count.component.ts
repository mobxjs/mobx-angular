import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Todos } from '../../stores/todos.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-count',
  template: `
    <span id="todo-count" *mobxAutorun>
      <strong>{{todos.uncompletedItems}}</strong> items left
    </span>
  `,
})
export class CountComponent {
  constructor(public todos: Todos) {}
}
