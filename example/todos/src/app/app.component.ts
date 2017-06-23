import { Component, ChangeDetectionStrategy } from '@angular/core';
import todos from './stores/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = '';

  todos = todos;

  addTodo() {
    todos.addTodo({ title: this.title });
    this.title = '';
  }
}
