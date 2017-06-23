import { Component, ChangeDetectionStrategy } from '@angular/core';
import todos from './stores/todos';

let counter = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title:string = '';

  todos = todos;

  addTodo() {
    todos.addTodo({ title: this.title });
    this.title = '';
  }
}
