import { observable, computed, action } from 'mobx';

class Todo {
  @observable completed:boolean = false;

  constructor(public title:string) {}

  @action toggle() {
    this.completed = !this.completed;
  }
  @action complete() {
    this.completed = true;
  }
}
const todo1 = new Todo('Buy Milk');
const todo2 = new Todo('Write ng2-mobx connector');

class Todos {
  @observable todos = [todo1, todo2];
  @observable filter = null;

  @action addTodo(title) {
    this.todos.push(new Todo(title));
  }

  @action removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  @action showAll() {this.filter = null}
  @action showCompleted() {this.filter = true}
  @action showActive() {this.filter = false}

  @action clearCompleted() {
    this.todos = this._filter(this.todos, false);
  }

  @action completeAll() {
    this.todos.forEach((todo) => todo.complete())
  }

  @computed get filteredTodos() {
    return this.filter !== null ?
      this._filter(this.todos, this.filter) :
      this.todos;
  }

  @computed get uncompletedItems() {
    return this._filter(this.todos, false).length;
  }

  private _filter(todos, value) {
    return todos.filter((todo) => todo.completed === value);
  }
}
export default new Todos();
