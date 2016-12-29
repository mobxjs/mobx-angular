import { observable, computed, action } from 'mobx';

class Todo {
  @observable completed:boolean = false;

  constructor(public title:string) {}

  @action toggle() {
    this.completed = !this.completed;
  }
}
const todo1 = new Todo('Buy Milk');
const todo2 = new Todo('Write ng2-mobx connector');

class Todos {
  @observable todos = [todo1, todo2];
  @observable filter = '';

  @action addTodo(title) {
    this.todos.push(new Todo(title));
  }

  @computed get filteredTodos() {
    return this.todos.filter((todo) => new RegExp(this.filter, 'i').test(todo.title));
  }

  @computed get uncompletedItems() {
    return this.todos.filter((todo) => !todo.completed).length;
  }
}
export default new Todos();
