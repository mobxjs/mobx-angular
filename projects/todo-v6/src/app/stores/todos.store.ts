import {
  observable,
  computed,
  action,
  autorun,
  toJS,
  makeAutoObservable,
  makeObservable
} from 'mobx';
import { Injectable } from '@angular/core';

export class Todo {
  completed = false;
  title: string;

  constructor({ title, completed }) {
    makeAutoObservable(this);
    this.completed = completed;
    this.title = title;
  }

  setCompleted(value) {
    this.completed = value;
  }
}

@Injectable()
export class Todos {
  todos = [];
  filter = 'SHOW_ALL';

  constructor() {
    makeObservable(this, {
      todos: observable,
      filter: observable,
      addTodo: action,
      removeTodo: action,
      showAll: action,
      showCompleted: action,
      showActive: action,
      clearCompleted: action,
      setCompleteAll: action,
      filteredTodos: computed,
      uncompletedItems: computed
    });
    this.localStorageSync();
  }

  addTodo({ title, completed = false }) {
    this.todos.push(new Todo({ title, completed }));
  }

  removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  showAll() {
    this.filter = 'SHOW_ALL';
  }
  showCompleted() {
    this.filter = 'COMPLETED';
  }
  showActive() {
    this.filter = 'ACTIVE';
  }

  clearCompleted() {
    this.todos = this._filter(this.todos, 'ACTIVE');
  }

  setCompleteAll(value) {
    this.todos.forEach(todo => todo.setCompleted(value));
  }

  get filteredTodos() {
    return this.filter !== 'SHOW_ALL'
      ? this._filter(this.todos, this.filter)
      : this.todos;
  }

  get uncompletedItems() {
    return this._filter(this.todos, false).length;
  }

  get allComplete() {
    return this.uncompletedItems === 0;
  }

  private _filter(todos, value) {
    return todos.filter(todo =>
      value === 'COMPLETED' ? todo.completed : !todo.completed
    );
  }

  private localStorageSync() {
    const initialTodos = JSON.parse(localStorage.todos || '[]');
    this.todos = initialTodos.map(todo => new Todo(todo));
    this.filter = JSON.parse(localStorage.filter || '"SHOW_ALL"');

    autorun(() => {
      localStorage.todos = JSON.stringify(toJS(this.todos));
      localStorage.filter = JSON.stringify(toJS(this.filter));
    });
  }
}
