import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Todos } from './stores/todos.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = '';

  constructor(public todos: Todos) {}

  addTodo() {
    this.todos.addTodo({ title: this.title });
    this.title = '';
  }
}
