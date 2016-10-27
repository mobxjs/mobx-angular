import { Component, ChangeDetectionStrategy } from '@angular/core';
import todos from './stores/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title:string = '';

  todos = todos;

  addTodo() {
    todos.addTodo(this.title);
    this.title = '';
  }
}
