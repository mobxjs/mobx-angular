import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Todos } from '../../stores/todos.store';
import { comparer } from 'mobx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  template: `
    <footer class="footer" *mobxAutorun>
      <app-count></app-count>
      <ul class="filters">
        <li>
          <a
            [class.selected]="todos.filter === 'SHOW_ALL'"
            (click)="todos.showAll()"
            >All</a
          >
        </li>
        <li>
          <a
            [class.selected]="todos.filter === 'ACTIVE'"
            (click)="todos.showActive()"
            >Active</a
          >
        </li>
        <li>
          <a
            [class.selected]="todos.filter === 'COMPLETED'"
            (click)="todos.showCompleted()"
            >Completed</a
          >
        </li>
      </ul>
      <button class="clear-completed" (click)="todos.clearCompleted()">
        Clear completed
      </button>
    </footer>
  `
})
export class FooterComponent {
  constructor(public todos: Todos) {}
}
