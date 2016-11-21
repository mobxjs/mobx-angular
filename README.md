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
Performance and magic!

This library brings the magic of automatic data binding, together with incredibly high performance.

You can use it together with OnPush strategy, and wrap your template with a `*mobxAutorun` directive.
The directive will automatically run the change detection whenever any observables your template uses change.

It will also dispose of the autorun callback when the component is destroyed.

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

Then use `*mobxAutorun` directive together with OnPush:
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

## reaction
Aside from autorun, MobX allows you to react to specific data changes.

Use `*mobxReaction="callback"` to automatically run change detection when specific observables change.

For example:
```
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div *mobxReaction="getStoreUpdates">
    {{ store.value }}
    {{ store.computedValue }}
  </div>`
})
class AppComponent {
  getStoreUpdates() {
    return store.anotherValue;
  }
}
```
Here the change detection will run only when 'anotherValue' changes.

## Injectable stores
You can easily make your stores injectable:
```
@Injectable()
class Store {
  @observable value;
  @action doSomething() { ... }
}
```

## Example
See the `example` folder, specifically these files:
/example/src/app/stores/todos.ts
/example/src/app/app.component.ts

To run it, clone this repo and run:
```
$ cd example
$ npm install
$ npm install -g angular-cli
$ ng serve
```
