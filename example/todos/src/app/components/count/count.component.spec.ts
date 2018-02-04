import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountComponent } from './count.component';

describe('CountComponent', () => {
  let component: CountComponent;
  let fixture: ComponentFixture<CountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountComponent ]
    })
    .compileComponents();
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
