[![Build Status](https://travis-ci.org/mobxjs/mobx-angular.svg?branch=master)](https://travis-ci.org/mobxjs/mobx-angular)
[![npm version](https://badge.fury.io/js/mobx-angular.svg)](https://badge.fury.io/js/mobx-angular)
# mobx-angular

## MobX connector for Angular (> 2)
If you're looking for the Angular 1 version version, it's [here](https://github.com/NgMobx/ng1-mobx)

## Features
1. The library allows you to automatically observe all the observables that your component uses
2. Automatically runs change detection - works with OnPush strategy
3. Disposes of all the observers when the component is destroyed
4. Debugging tools

## Usage

Install:
```
$ npm install --save mobx-angular
```

Import the MobxAngularModule:
```ts
import { MobxAngularModule } from 'mobx-angular';

@NgModule({
    imports: [..., MobxAngularModule]
})
export class MyModule {}
```

## autorun
Use `*mobxAutorun` directive in your template:
```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
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
```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

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
```ts
import { observable, action } from 'mobx-angular';

@Injectable()
class Store {
  @observable value;
  @action doSomething() { ... }
}
```

## Debugging MobX
mobx-angular comes with a handy debug tool.
To turn on / off the debug tool, open developer tools' console, and run:
```ts
MobxAngularDebug(true) // turn on
MobxAngularDebug(false) // turn off
```
Then you can hover over the components that use mobx directives, and you will have a small box to click on to console.log the dependencies of that component.
Also, every action that happens in mobx will be console.logged in a nice way.

## Examples
See the `example` folder, specifically these files:  
`/example/todos/src/app/stores/todos.ts`  
`/example/todos/src/app/app.component.ts`

To run the examples, clone this repo and run:
```
$ npm install -g @angular/cli
$ cd example/<example-folder>
$ npm install
$ ng serve
```
