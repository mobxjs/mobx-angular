import { Component } from '@angular/core';
import { observe, connect } from 'ng2-mobx';
import todos from './stores/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = '';

  @observe(todos, 'filteredTodos') todos$;
  @observe(() => todos.uncompletedItems.length) uncompletedItems$;

  @connect
  mapStateToThis() {
    return {
      filter: todos.filter
    }
  }

  changeFilter(value) {
    todos.changeFilter(value);
  }

  addTodo() {
    todos.addTodo(this.title);
    this.title = '';
  }
}
