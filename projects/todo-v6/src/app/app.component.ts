import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Todos } from './stores/todos.store';
import { makeAutoObservable } from 'mobx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <form name="new-todo" class="todo-form" (submit)="addTodo()">
          <input
            class="new-todo"
            name="title"
            placeholder="What needs to be done?"
            [(ngModel)]="title"
            autofocus
          />
        </form>
      </header>
      <app-section></app-section>
      <app-footer></app-footer>
    </section>
  `
})
export class AppComponent {
  title = '';
  get titles() {
    return [this.title];
  }

  constructor(public todos: Todos) {
    makeAutoObservable(this);
  }

  addTodo() {
    this.todos.addTodo({ title: this.title });
    this.title = '';
  }
}
