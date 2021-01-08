import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { makeAutoObservable, reaction } from 'mobx';
import { MobxAutorunDirective, MobxReactionDirective } from '../public-api';
import { RouterStore } from './router-store.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

let fullNameCalculations = 0;
let firstCharCalculations = 0;

class TestStore {
  firstName = 'James';
  lastName = 'Bond';

  constructor() {
    makeAutoObservable(this);
  }

  get fullName() {
    fullNameCalculations++;
    return `${this.firstName} ${this.lastName}`;
  }

  setNames(firstName, lastName) {
    Object.assign(this, { firstName, lastName });
  }
}

@Component({
  template: `
    <div *mobxAutorun>
      <span id="fullname">{{ store.fullName }}</span>
    </div>
    <button (click)="setLastName()">Set Name</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
  private store = new TestStore();

  constructor() {
    fullNameCalculations = 0;
  }

  setLastName() {
    this.store.lastName = 'Dean';
  }
}

@Component({
  template: `
    <div *mobxReaction="getFirstLetter.bind(this)">
      <span id="firstchar">{{ char }}</span>
    </div>
    <button (click)="setLastName()">Set Name</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestReactionComponent {
  private store = new TestStore();
  char = 'J';

  constructor() {
    firstCharCalculations = 0;
  }

  getFirstLetter() {
    firstCharCalculations++;
    return (this.char = this.store.fullName[0]);
  }

  setLastName() {
    this.store.setNames('Michael', 'Jackson');
  }
}

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestRouterRootComponent {}

@Component({
  template: `
    <div>home</div>
    <button (click)="routerStore.navigate('/target')">Back to Home</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestRouterHomeComponent {
  constructor(public routerStore: RouterStore) {}
}

@Component({
  template: `
    <div>target</div>
    <button (click)="routerStore.navigate('/')">Back to Home</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestRouterTargetComponent {
  constructor(public routerStore: RouterStore) {}
}

describe('mobxAngular', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<any>;
  let fullname;
  let button;
  let firstchar;

  describe('mobxAutorun', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MobxAutorunDirective, TestComponent]
      });
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;

      fullname = fixture.nativeElement.querySelector('#fullname');
      button = fixture.nativeElement.querySelector('button');
    });

    it('should have correct content', () => {
      expect(fullname.textContent).toEqual('James Bond');
      expect(fullNameCalculations).toEqual(1);
    });

    it('should recompute value once', done => {
      button.click();
      setTimeout(() => {
        expect(fullname.textContent).toEqual('James Dean');
        expect(fullNameCalculations).toEqual(2);
        done();
      });
    });
  });

  describe('mobxReaction', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MobxReactionDirective, TestReactionComponent]
      });
      fixture = TestBed.createComponent(TestReactionComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;

      firstchar = fixture.nativeElement.querySelector('#firstchar');
      button = fixture.nativeElement.querySelector('button');
    });

    it('should call the reaction function once on init', () => {
      expect(firstchar.textContent).toEqual('J');
      expect(fixture.componentInstance.char).toEqual('J');
      expect(firstCharCalculations).toEqual(1);
    });

    it('should recompute value once', done => {
      button.click();
      setTimeout(() => {
        expect(firstchar.textContent).toEqual('M');
        expect(fixture.componentInstance.char).toEqual('M');
        expect(firstCharCalculations).toEqual(2);

        done();
      });
    });

    it('should not recompute every change detection', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      fixture.detectChanges();
      expect(firstCharCalculations).toEqual(1);
    });
  });

  describe('routerStore', () => {
    let location: Location;
    let router: Router;
    let routerStore: RouterStore;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
            { path: '', component: TestRouterHomeComponent },
            { path: 'target', component: TestRouterTargetComponent }
          ])
        ],
        declarations: [
          TestRouterRootComponent,
          TestRouterHomeComponent,
          TestRouterTargetComponent
        ],
        providers: [RouterStore]
      }).compileComponents();

      fixture = TestBed.createComponent(TestRouterRootComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;

      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
      routerStore = TestBed.inject(RouterStore);
      fixture.ngZone.run(() => {
        router.initialNavigation();
      });
    });

    it('should route to the target component', fakeAsync(() => {
      button = fixture.nativeElement.querySelector('button');
      button.click();
      tick();

      expect(location.path()).toBe('/target');
    }));

    it('should update the observable url', fakeAsync(() => {
      button = fixture.nativeElement.querySelector('button');
      button.click();
      tick();

      expect(routerStore.url).toBe('/target');

      button = fixture.nativeElement.querySelector('button');
      button.click();
      tick();

      expect(routerStore.url).toBe('/');
    }));

    it('should react to changes in the observable url', fakeAsync(() => {
      let count = 0;
      reaction(
        () => routerStore.url,
        () => {
          count++;
        }
      );

      button = fixture.nativeElement.querySelector('button');
      button.click();
      tick();

      button = fixture.nativeElement.querySelector('button');
      button.click();
      tick();

      button = fixture.nativeElement.querySelector('button');
      button.click();
      tick();

      expect(count).toBe(3);
    }));
  });
});
