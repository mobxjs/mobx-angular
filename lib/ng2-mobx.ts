import { reaction, autorun } from 'mobx';
import { Observable } from 'rxjs';

const noop = () => {}

function createOnDestroy(target) {
  if (!target.mobxObservables) {
    const oldNgOnDestroy = target.ngOnDestroy ? target.ngOnDestroy.bind(target) : noop;

    target.mobxObservables = [];
    target.ngOnDestroy = () => {
      oldNgOnDestroy();
      target.mobxObservables.forEach((dispose) => dispose());
    }
  }
}

export function observe(observed, key = undefined) {
  const fn = key ? () => observed[key] : observed;

  return function (target, propertyKey: string) {
    createOnDestroy(target);

    const rxObservable = Observable.create((observer) => {
      const dispose = reaction(fn, (data) => observer.next(data), true);

      target.mobxObservables.push(dispose);
    });

    target[propertyKey] = rxObservable;
  }
}

export function connect(target, propertyKey) {
  target._oldNgOnInit = target.ngOnInit || noop;

  target.ngOnDestroy = target.ngOnDestroy || noop;

  target.ngOnInit = function() {
    createOnDestroy(this);
    this._oldNgOnInit();

    const dispose = autorun(() => {
      const mapped = this[propertyKey]();
      Object.assign(this, mapped);
    });

    this.mobxObservables.push(dispose);
  }
}
