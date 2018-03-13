[![Build Status](https://travis-ci.org/mobxjs/mobx-angular.svg?branch=master)](https://travis-ci.org/mobxjs/mobx-angular)
[![npm version](https://badge.fury.io/js/mobx-angular.svg)](https://badge.fury.io/js/mobx-angular)
# mobx-angular

## MobX connector for Angular (versions 2, 4, 5)
If you're looking for the Angular 1 version version, it's [here](https://github.com/mobxjs/ng1-mobx)

## Features
1. The library allows you to automatically observe all the observables that your component uses
2. Automatically runs change detection - works great with OnPush strategy
3. Disposes of all the observers when the component is destroyed
4. Debugging tools

## Usage

Install:
```
$ npm install --save mobx-angular mobx
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

The directive will do the following:
- Observe all the observables / computed values that your component uses
- Automatically run the `detectChanges` method whenever there's a relevant change

Under the hood, this magic happens by running `autorun(() => view.detectChanges())`

## detach
You can improve your component's performance by detaching it from CD (Change Detection), by supplying `*mobxAutorun="{ detach: true }"`. 

This might cause things to stop updating. You have 3 options to manage that:
- Define local component properties as observables or computed values
- Surround with *mobxAutorun only the parts that actually use observable / computed values from the store
- Instead of detaching, use OnPush CD strategy on the component

## autorunSync
This method is deprecated - do not use it.

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
## Using with OnPush or ngZone: 'noop'
To achieve great performance, you can set `OnPush` change detection strategy on your components (this can be configured as default in `.angular-cli.json`).
MobX will run change detection manually for you on the components that need to be updated.

* In Angular 5 there's a new option, which is to disable Zone completely when bootstrapping the app (ngZone: 'noop').
Please note that this means that all 3rd-party components will stop working (because they rely on change detection to work via Zone).

## Debugging MobX (only for mobx-angular versions 2.X and below)
mobx-angular comes with a handy debug tool.
To turn on / off the debug tool, open developer tools' console, and run:
```ts
mobxAngularDebug(true) // turn on
mobxAngularDebug(false) // turn off
```
Then you can right-click on the components that use mobx directives, and you will see a console log of the components' dependencies.
Also, every action that happens in mobx will be console.logged in a nice way.

TBD - support debugging for MobX 4

## AoT
Some people complained about AoT when using mobx decorators inside components. 
In case you do that - we export a proxy to the decorators from mobx-angular, which should be AoT compatible, e.g.:  
`import { observable, computed } from 'mobx-angular'`

The only thing you can't do when importing from mobx-angular is using the modifiers, such as `@observable.ref`.

## Examples
See the `example` folder, specifically these files:  
`/example/todos/src/app/stores/todos.store.ts`  
`/example/todos/src/app/app.component.ts`

To run the examples, clone this repo and run:
```
$ npm install -g @angular/cli
$ cd example/<example-folder>
$ npm install
$ npm start
```
