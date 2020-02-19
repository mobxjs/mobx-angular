import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Todos } from '../../stores/todos.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-section',
  template: `
    <section class="main" *mobxAutorun>
      <input
        class="toggle-all"
        type="checkbox"
        [checked]="todos.allComplete"
        (change)="todos.setCompleteAll(!todos.allComplete)"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li
          *ngFor="let todo of todos.filteredTodos"
          [class.completed]="todo.completed"
        >
          <div class="view">
            <input
              class="toggle"
              type="checkbox"
              [checked]="todo.completed"
              (change)="todo.setCompleted(!todo.completed)"
            />
            <label>{{ todo.title }}</label>
            <button class="destroy" (click)="todos.removeTodo(todo)"></button>
          </div>
        </li>
      </ul>
    </section>
  `
})
export class SectionComponent {
  constructor(public todos: Todos) {}
}
