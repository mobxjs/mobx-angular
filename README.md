# ng2-mobx

## MobX connector for Angular 2
MobX is a modern reactive state management library:

This simple library connects MobX to Angular 2 components.

## Why use MobX
The advantages of MobX are:
* Normalized - MobX lets you define computed values that are based on the minimal state
* Reactivity - MobX Automatically figures out when to re-invoke subscribers according to which observables they used. This allows for extremely performant applications
* Plain objects - Use plain objects and classes with MobX decorators, or even observe existing objects (from external sources for example)
* MobX is being used heavily in the community (mainly with React)

## Why use this library
You can easily use plain MobX with Angular 2 without this library.

But, you will find yourself repeating boilerplate code, such as disposing of subscribers when a component destroys (or worse - forgetting to do that).

Also, this library offers a quick conversion of MobX observable attributes to RX observables, which allows you to use them with `async` pipe.

## Usages
```
class Component {
  // Observe a property by name
  // attribute$ will be an RX observable:
  @observe(store, 'attribute') attribute$;

  // Observe a property by function:
  // attribute$ will be an RX observable:
  @observe(() => store.attribute) attribute$;

  // auto-run this function and save the returned properties on the component instance
  @connect
  mapStateToThis() {
    // When using OnPush, mark the component for change detection:
    this.changeDetectorRef.markForCheck();
    return  {
      attribute: store.attribute
    };
  }
}
```

## Example
See the `example` folder.
To run it, clone this repo and run:
`npm run example`
