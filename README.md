[![Build Status](https://travis-ci.org/500tech/ng2-mobx.svg?branch=master)](https://travis-ci.org/500tech/ng2-mobx)
[![npm version](https://badge.fury.io/js/ng2-mobx.svg)](https://badge.fury.io/js/ng2-mobx)
# ng2-mobx

## MobX connector for Angular 2
If you're looking for the Angular 1 version version, it's [here](https://github.com/500tech/ng-mobx)

MobX is a modern reactive state management library.

This simple library connects MobX to Angular 2 components.

## Why use MobX
The advantages of MobX are:
* Normalized - MobX lets you define computed values that are based on the minimal state
* Reactivity - MobX Automatically figures out when to re-invoke subscribers according to which observables they use. This allows for extremely performant applications
* Plain objects - Use plain objects and classes with MobX decorators, or even observe existing objects (from external sources for example)
* MobX is being used heavily in the community (mainly with React)

<a href="http://mobxjs.github.io/mobx" target="_blank">Read more about MobX</a>

## Why use this library
1. The library allows you to automatically observe all the observables that your component uses
2. You can also use it together with OnPush strategy, to incredibly high performance
3. It disposes of all the observers when the component is destroyed
4. It gives you powerful debugging tools

## Usage

Install:
```
$ npm install --save ng2-mobx
```

Import the Ng2MobxModule:
```
import { Ng2MobxModule } from 'ng2-mobx';

@NgModule({
    imports: [..., Ng2MobxModule]
})
export class MyModule {}
```

## autorun
Use `*mobxAutorun` directive in your template:
```
import {store} from './store/counter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *mobxAutorun>
      {{ store.value }} - {{ store.computedValue }}
      <button (click)="store.action">Action</button>
    </div>
  `
})
export class AppComponent {
    store = store;
}
```

The directive will observe all the observables that your component uses, and will automatically run the change detection whenever there's a change.

Use it together with onPush to gain maximum performance.

## autorunSync
The same as autorun, except it runs synchronously.

## reaction
Aside from autorun, MobX allows you to react to specific data changes.

Usage:
```
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div *mobxReaction="getParity.bind(this)">
    {{ parity }}
  </div>`
})
class AppComponent {
  getParity() {
    return this.parity = store.counter % 2 ? 'Odd' : 'Even';
  }
}
```
The `callback` function will automatically re-run whenever any observable that it uses changes.
Change Detection will run automatically whenever the return value of `callback` changes.
If you don't return anything, change detection will not run.

In this example, the `parity` property will be updated according to `counter`,
and change detection will run only when the `parity` changes.

## Injectable stores
You can easily make your stores injectable:
```
@Injectable()
class Store {
  @observable value;
  @action doSomething() { ... }
}
```

## Debugging MobX
ng2-mobx comes with a handy debug tool, that:
- console.log's everything that happens in MobX in a nice way
- Allows you to console.log the dependency tree of your components that are using ng2-mobx directives

to turn on / off the debug tool, run:
```
ng2MobxDebug(true / false)
```

## Example
See the `example` folder, specifically these files:
/example/todos/src/app/stores/todos.ts
/example/todos/src/app/app.component.ts

To run it, clone this repo and run:
```
$ cd example/todos
$ npm install
$ npm install -g angular-cli
$ ng serve
```
