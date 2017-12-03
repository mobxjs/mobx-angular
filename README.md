[![Build Status](https://travis-ci.org/mobxjs/mobx-angular.svg?branch=master)](https://travis-ci.org/mobxjs/mobx-angular)
[![npm version](https://badge.fury.io/js/mobx-angular.svg)](https://badge.fury.io/js/mobx-angular)
# mobx-angular

## MobX connector for Angular (versions 2, 4, 5)
If you're looking for the Angular 1 version version, it's [here](https://github.com/NgMobx/ng1-mobx)

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
- Run `detach` on the view under *mobxAutorun (disables change detection)
- Observe all the observables / computed values that your component uses
- Automatically run the `detectChanges` method whenever there's a relevant change

Under the hood, this magic happens by running `autorun(() => view.detecChanges)`

## dontDetach
If you rather not detach your view from Change Detection - you can pass a config object to mobxAutorun:
```
<ng-container *mobxAutorun="{ dontDetach: true }">
  ...
</ng-container>
```

But notice that this misses the purpose of using *mobxAutorun for better performance.
If you need something outside of the store you have 2 options without disabling detach:
- Define local component properties as observables or computed values
- Surround with *mobxAutorun only the parts that actually use observable / computed values from the store

## autorunSync
This method is deprecated - do not use it

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

## Debugging MobX
mobx-angular comes with a handy debug tool.
To turn on / off the debug tool, open developer tools' console, and run:
```ts
mobxAngularDebug(true) // turn on
mobxAngularDebug(false) // turn off
```
Then you can right-click on the components that use mobx directives, and you will see a console log of the components' dependencies.
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
