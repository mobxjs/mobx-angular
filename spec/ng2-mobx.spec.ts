import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { action, computed, observable } from "mobx";
import {
  MobxAutorunDirective,
  MobxReactionDirective
} from "../lib/mobx-angular";

let fullNameCalculations = 0;
let firstCharCalculations = 0;

class TestStore {
  @observable firstName = "James";
  @observable lastName = "Bond";

  @computed get fullName() {
    fullNameCalculations++;
    return `${this.firstName} ${this.lastName}`;
  }

  @action setNames(firstName, lastName) {
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
    this.store.lastName = "Dean";
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
class TestComponentReaction {
  private store = new TestStore();
  char = "J";

  constructor() {
    firstCharCalculations = 0;
  }

  getFirstLetter() {
    firstCharCalculations++;
    return (this.char = this.store.fullName[0]);
  }

  setLastName() {
    this.store.setNames("Michael", "Jackson");
  }
}

describe("mobxAngular", () => {
  let component: TestComponent;
  let fixture: ComponentFixture<any>;
  let fullname, button, firstchar;

  describe("mobxAutorun", () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MobxAutorunDirective, TestComponent]
      });
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;

      fullname = fixture.nativeElement.querySelector("#fullname");
      button = fixture.nativeElement.querySelector("button");
    });

    it("should have correct content", () => {
      expect(fullname.textContent).toEqual("James Bond");
      expect(fullNameCalculations).toEqual(1);
    });

    it("should recompute value once", done => {
      button.click();
      setTimeout(() => {
        expect(fullname.textContent).toEqual("James Dean");
        expect(fullNameCalculations).toEqual(2);
        done();
      });
    });
  });

  describe("mobxReaction", () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [MobxReactionDirective, TestComponentReaction]
      });
      fixture = TestBed.createComponent(TestComponentReaction);
      fixture.detectChanges();
      component = fixture.componentInstance;

      firstchar = fixture.nativeElement.querySelector("#firstchar");
      button = fixture.nativeElement.querySelector("button");
    });

    it("should call the reaction function once on init", () => {
      expect(firstchar.textContent).toEqual("J");
      expect(fixture.componentInstance.char).toEqual("J");
      expect(firstCharCalculations).toEqual(1);
    });

    it("should recompute value once", done => {
      button.click();
      setTimeout(() => {
        expect(firstchar.textContent).toEqual("M");
        expect(fixture.componentInstance.char).toEqual("M");
        expect(firstCharCalculations).toEqual(2);

        done();
      });
    });

    it("should not recompute every change detection", () => {
      fixture.detectChanges();
      fixture.detectChanges();
      fixture.detectChanges();
      expect(firstCharCalculations).toEqual(1);
    });
  });
});
