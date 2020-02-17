import { Component, ChangeDetectionStrategy } from '@angular/core';
import { observable, computed, action } from 'mobx-angular';
import { Todos } from './stores/todos.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `
    <section id="todoapp">
      <header id="header">
        <h1>todos</h1>
        <form name="new-todo" id="todo-form" (submit)="addTodo()">
          <input
            id="new-todo"
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
  @observable.ref title = '';
  @computed.struct get titles() {
    return [this.title];
  }

  constructor(public todos: Todos) {}

  @action.bound addTodo() {
    this.todos.addTodo({ title: this.title });
    this.title = '';
  }
}
