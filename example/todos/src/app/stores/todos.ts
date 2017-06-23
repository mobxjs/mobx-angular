
class Todo {
  completed = false;
  title: string;

  constructor({ title, completed }) {
    this.completed = completed;
    this.title = title;
  }

  toggle() {
    this.completed = !this.completed;
  }
  complete() {
    this.completed = true;
  }
}

class Todos {
  todos = [];
  filter = 'SHOW_ALL';

  addTodo({ title, completed = false }) {
    this.todos.push(new Todo({ title, completed }));
  }

  removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  showAll() { this.filter = 'SHOW_ALL'; }
  showCompleted() { this.filter = 'COMPLETED'; }
  showActive() { this.filter = 'ACTIVE'; }

  clearCompleted() {
    this.todos = this._filter(this.todos, 'ACTIVE');
  }

  completeAll() {
    this.todos.forEach((todo) => todo.complete());
  }

  get filteredTodos() {
    return this.filter !== 'SHOW_ALL' ?
      this._filter(this.todos, this.filter) :
      this.todos;
  }

  get uncompletedItems() {
    return this._filter(this.todos, false).length;
  }

  private _filter(todos, value) {
    return todos.filter((todo) => value === 'ACTIVE' ? !todo.completed : todo.completed);
  }
}

const todoStore = new Todos();

export default todoStore;
