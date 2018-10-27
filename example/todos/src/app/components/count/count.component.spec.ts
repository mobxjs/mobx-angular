import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountComponent } from './count.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Todos } from 'app/stores/todos.store';

describe('CountComponent', () => {
  let component: CountComponent;
  let fixture: ComponentFixture<CountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountComponent],
      providers: [Todos],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
