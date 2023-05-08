[![Tests](https://github.com/mobxjs/mobx-angular/actions/workflows/main.yml/badge.svg)](https://github.com/mobxjs/mobx-angular/actions/workflows/main.yml)
[![npm version](https://badge.fury.io/js/mobx-angular.svg)](https://badge.fury.io/js/mobx-angular)

# mobx-angular

## Looking for maintainers
Hi!
Although this library is very small and simple, it still needs a little bit of attention here and there.  

If there's anyone from the community that's willing to step up, we would be happy to add you to the MobX organization. Just reply to the issue:  
https://github.com/mobxjs/mobx-angular/issues/141

## MobX connector for Angular

If you're looking for the Angular 1 version version, it's [here](https://github.com/mobxjs/ng1-mobx)

## Why MobX?

Angular's change detection is great, but it updates the entire UI on every change, and doesn't have any knowledge of how our components use our services.  
MobX automatically knows what properties your components use from the stores and listens to changes. It allows you to automatically react to changes and update only the parts of the UI that need to be updated, making your app performant.  
With MobX you manage your app's state using mutable objects and classes. It also helps you create computed values and side-effects.

[Learn more about MobX](https://mobx.js.org/README.html)

## This library

1. Automatically observe all the observables that your component uses
2. Automatically runs change detection - works great with OnPush strategy
3. Disposes of all the observers when the component is destroyed

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
import { store } from './store/counter';

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

## Why directive and not decorator?

In order to inject the change detector, and implement lifecycle hooks like ngOnDestroy, this library uses a directive, which is the most elegant solution in Angular.
It also has the benefit of allowing you to easily have multiple observed sections of your component's template, in case it is required.

## detach

You can improve your component's performance by detaching it from CD (Change Detection), by supplying `*mobxAutorun="{ detach: true }"`.

This might cause things to stop updating. You have 3 options to manage that:

- Define local component properties as observables or computed values
- Surround with \*mobxAutorun only the parts that actually use observable / computed values from the store
- Instead of detaching, use OnPush CD strategy on the component

## reaction

Aside from autorun, MobX allows you to react to specific data changes.

Usage:

```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { store } from './store/counter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *mobxReaction="getParity.bind(this)">
      {{ parity }}
    </div>
  `
})
class AppComponent {
  getParity() {
    return (this.parity = store.counter % 2 ? 'Odd' : 'Even');
  }
}
```

The `callback` function will automatically re-run whenever any observable that it uses changes.
Change Detection will run automatically whenever the return value of `callback` changes.
If you don't return anything, change detection will not run.

In this example, the `parity` property will be updated according to `counter`,
and change detection will run only when the `parity` changes.

## options

It is possible to pass an options object to `*mobxAutorun` and `*mobxReaction` directives. For a list of possible options visit the official [docs](https://mobx.js.org/reactions.html).

Usage:

```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { store } from './store/counter';
import { comparer } from 'mobx';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *mobxAutorun="{ detach: true, name: 'foo', delay: 3000 }">
      {{ store.value }} - {{ store.computedValue }}
      <button (click)="store.action">Action</button>
    </div>
    <div *mobxReaction="getParity.bind(this); options: { name: 'parity reaction', equals: comparer.shallow }">
      {{ parity }}
    </div>
  `
})
export class AppComponent {
  store = store;
  comparer = comparer;

  getParity() {
    return (this.parity = store.counter % 2 ? 'Odd' : 'Even');
  }
}
```

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

## Router store

Using the `RouterStore`, you can observe route changes.
By injecting this store to a component you will get access to the url as a MobX observable, and the entire activated route snapshot.

Usage:

```ts
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterStore } from 'mobx-angular';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div></div>`
})
export class AppComponent {
  constructor(public routerStore: RouterStore) {
    // You get access to the url as a mobx observable through routerStore.url
    // And to the activated route snapshot through routerStore.routeSnapshot
  }
}
```

## MobX v6

In order to become compatible with modern ES standards, decorators are not used by default in MobX v6. It still supports decorators, but they are not recommended for greenfield projects.
[Read More](https://michel.codes/blogs/mobx6)

- In order to use MobX 6 with decorators `makeObservable(this)` should be added to the constructor, and "useDefineForClassFields": true should be added to tsconfig.json.
- For the full migration guide, click [here](https://mobx.js.org/migrating-from-4-or-5.html).

Check out `projects/todo-v6` for a working example.

## Using with OnPush or ngZone: 'noop'

To achieve great performance, you can set `OnPush` change detection strategy on your components (this can be configured as default in `.angular-cli.json`).
MobX will run change detection manually for you on the components that need to be updated.

- In Angular 5 there's a new option, which is to disable Zone completely when bootstrapping the app (ngZone: 'noop').
- Please note that this means that all 3rd-party components will stop working (because they rely on change detection to work via Zone).

## Debugging MobX (only for mobx-angular versions 2.X and below)

mobx-angular comes with a handy debug tool.
To turn on / off the debug tool, open developer tools' console, and run:

```ts
mobxAngularDebug(true); // turn on
mobxAngularDebug(false); // turn off
```

Then you can right-click on the components that use mobx directives, and you will see a console log of the components' dependencies.
Also, every action that happens in mobx will be console.logged in a nice way.

TBD - support debugging for MobX 4

## AoT

Some people complained about AoT when using mobx decorators inside components.
In case you do that - we export a proxy to the decorators from mobx-angular, which should be AoT compatible, e.g.:  
`import { observable, computed } from 'mobx-angular'`

## DevTools

Check out `projects/todo` for an example of how to use `mobx-remotedev` with Angular:

```
$ npm install mobx-remotedev
```

```ts
// app.module.ts
import remotedev from 'mobx-remotedev';
import { Todos } from './stores/todos.store';

@NgModule({
  ...
  providers: [
    { provide: Todos, useClass: remotedev(Todos, { global: true }), deps: [] }
  ],
})

```

## Examples

See the `projects` folder, specifically these files:  
`/projects/todo/src/app/stores/todos.store.ts`  
`/projects/todo/src/app/app.component.ts`

To run the examples, clone this repo and run:

```shell
$ npm install -g @angular/cli
$ npm install
$ npm run build
$ npm run start <example> # for example `npm run start todo`
```

## Contributing

Important things to always consider when changing code in this library:  
- Make it readable, add comments when necessary
- Add unit tests for the new functionality. Think about edge cases. Make sure tests pass before merging.
- Keep backwards compatibility. Don't force users to refactor their code, even if it means adding a new API instead of changing an exsiting one.
- Keep SEMVER. If breaking changes is unavoidable - increase a major version. New features, however small should increase a minor version, and patch is for bugfixes/performance/refactoring
- Think about bundle size and speed
