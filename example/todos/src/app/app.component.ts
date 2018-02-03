import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Todos } from './stores/todos.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
    <section id="todoapp">
      <header id="header">
        <h1>todos</h1>
        <form name="new-todo" id="todo-form" (submit)="addTodo()">
          <input id="new-todo" name="title" placeholder="What needs to be done?" [(ngModel)]="title" autofocus>
        </form>
      </header>
      <app-section></app-section>
      <app-footer></app-footer>
    </section>
  `,
})
export class AppComponent {
  title = '';

  constructor(public todos: Todos) {}

  addTodo() {
    this.todos.addTodo({ title: this.title });
    this.title = '';
  }
}
