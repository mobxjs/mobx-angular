import { NgModule } from '@angular/core';
import {MobxAutorunDirective} from './directives/mobx-autorun.directive';
import {MobxReactionDirective} from './directives/mobx-reaction.directive';
import {action as mobxAction} from 'mobx';
import {computed as mobxComputed} from 'mobx';
import {observable as mobxObservable} from 'mobx';

export {
  MobxAutorunDirective,
  MobxReactionDirective
}

const DIRECTIVES = [MobxAutorunDirective, MobxReactionDirective];
@NgModule({
  declarations: [
    ...DIRECTIVES
  ],
  exports: [
    ...DIRECTIVES
  ],
  imports: [],
  providers: []
})
export class MobxAngularModule {
}

export function action(...args) {
  return (mobxAction as any)(...args);
}
Object.assign(action, mobxAction);

export function computed(...args) {
  return (mobxComputed as any)(...args);
}
Object.assign(computed, mobxComputed);

export function observable(...args) {
  return (mobxObservable as any)(...args);
}
Object.assign(observable, mobxObservable);
