import { observable, computed, action, autorun, toJS } from 'mobx';
import { Injectable } from '@angular/core';

class Todo {
  @observable completed = false;
  @observable title: string;

  constructor({ title, completed }) {
    this.completed = completed;
    this.title = title;
  }

  @action setCompleted(value) {
    this.completed = value;
  }
}

@Injectable()
export class Todos {
  @observable todos = [];
  @observable filter = 'SHOW_ALL';

  constructor() {
    this.localStorageSync();
  }

  @action addTodo({ title, completed = false }) {
    this.todos.push(new Todo({ title, completed }));
  }

  @action removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  @action showAll() { this.filter = 'SHOW_ALL'; }
  @action showCompleted() { this.filter = 'COMPLETED'; }
  @action showActive() { this.filter = 'ACTIVE'; }

  @action clearCompleted() {
    this.todos = this._filter(this.todos, 'ACTIVE');
  }

  @action setCompleteAll(value) {
    this.todos.forEach((todo) => todo.setCompleted(value));
  }

  @computed get filteredTodos() {
    return this.filter !== 'SHOW_ALL' ?
      this._filter(this.todos, this.filter) :
      this.todos;
  }

  @computed get uncompletedItems() {
    return this._filter(this.todos, false).length;
  }

  @computed get allComplete() {
    return this.uncompletedItems === 0;
  }

  private _filter(todos, value) {
    return todos.filter((todo) => value === 'COMPLETED' ? todo.completed : !todo.completed);
  }

  private localStorageSync() {
    const initialTodos = JSON.parse(localStorage.todos || '[]');
    this.todos = initialTodos.map((todo) => new Todo(todo));
    this.filter = JSON.parse(localStorage.filter || '"SHOW_ALL"');

    autorun(() => {
      localStorage.todos = JSON.stringify(toJS(this.todos));
      localStorage.filter = JSON.stringify(toJS(this.filter));
    });
  }
}
