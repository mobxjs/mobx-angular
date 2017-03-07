import { By } from "@angular/platform-browser";
import { DebugElement, Component, ChangeDetectionStrategy } from "@angular/core";
import { TestBed, async, fakeAsync, tick } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

import { observable, computed, action } from "mobx";
import { MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective } from "../lib/mobx-angular";

let fullNameCalculations;
let firstCharCalculations;

class TestStore {
  @observable firstName = "James";
  @observable lastName = "Bond";

  @computed get fullName() {
    fullNameCalculations++;
    return `${this.firstName} ${this.lastName}`;
  }

  @action setNames(firstName, lastName) {
    Object.assign(this, {firstName, lastName});
  }
}

@Component({
  template: `
    <div *mobxAutorun>
      <span id="fullname">{{store.fullName}}</span>
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
    <div *mobxAutorunSync>
      <span id="fullname">{{store.fullName}}</span>
    </div>
    <button (click)="setLastName()">Set Name</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponentSync {
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
      <span id="firstchar">{{char}}</span>
    </div>
    <button (click)="setLastName()">Set Name</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponentReaction {
  private store = new TestStore();
  char:string = 'J';
  constructor() {
    firstCharCalculations = 0;
  }
  getFirstLetter() {
    firstCharCalculations++;
    return this.char = this.store.fullName[0];
  }
  setLastName() {
    this.store.setNames('Michael','Jackson');
  }
}

let fullname, button, component, firstchar;

describe('mobxAngular', () => {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  describe('mobxAutorun', () => {
    beforeEach((done) => {
      component = TestBed
        .configureTestingModule({ declarations: [ MobxAutorunDirective, TestComponent ] })
        .createComponent(TestComponent);

      component.detectChanges(); // initial binding

      fullname = component.debugElement.query(By.css("#fullname"));
      button = component.debugElement.query(By.css("button"));
      setTimeout(done);
    });

    // color tests
    it("should have correct content", () => {
      expect(fullname.nativeElement.innerText).toEqual("James Bond");
      expect(fullNameCalculations).toEqual(1);
    });

    it("should recompute value once", (done) => {
      button.triggerEventHandler("click", null);
      setTimeout(() => {
        expect(fullname.nativeElement.innerText).toEqual("James Dean");
        expect(fullNameCalculations).toEqual(2);
        done();
      });
    });

    it("should not recompute every change detection", () => {
      component.detectChanges();
      component.detectChanges();
      component.detectChanges();
      expect(fullNameCalculations).toEqual(1);
    });
  });

  describe('mobxReaction', () => {
    beforeEach((done) => {
      component = TestBed
        .configureTestingModule({ declarations: [ MobxReactionDirective, TestComponentReaction ] })
        .createComponent(TestComponentReaction);

      component.detectChanges(); // initial binding

      firstchar = component.debugElement.query(By.css("#firstchar"));
      button = component.debugElement.query(By.css("button"));
      setTimeout(done);
    });

    // color tests
    it("should call the reaction function once on init", () => {
      expect(firstchar.nativeElement.innerText).toEqual("J");
      expect(component.componentInstance.char).toEqual("J");
      expect(firstCharCalculations).toEqual(1);
    });

    it("should recompute value once", (done) => {
      button.triggerEventHandler("click", null);
      setTimeout(() => {
        expect(firstchar.nativeElement.innerText).toEqual("M");
        expect(component.componentInstance.char).toEqual("M");
        expect(firstCharCalculations).toEqual(2);

        done();
      });
    });

    it("should not recompute every change detection", () => {
      component.detectChanges();
      component.detectChanges();
      component.detectChanges();
      expect(firstCharCalculations).toEqual(1);
    });
  });
});
