import { NgModule } from '@angular/core';
import {MobxAutorunDirective} from './directives/mobx-autorun.directive';
import {MobxAutorunSyncDirective} from './directives/mobx-autorun-sync.directive';
import {MobxReactionDirective} from './directives/mobx-reaction.directive';
import {action as mobxAction} from 'mobx';
import {computed as mobxComputed} from 'mobx';
import {observable as mobxObservable} from 'mobx';

export {
  MobxAutorunDirective,
  MobxAutorunSyncDirective,
  MobxReactionDirective
}

const DIRECTIVES = [MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective];
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

export function computed(...args) {
  return (mobxComputed as any)(...args);
}

export function observable(...args) {
  return (mobxObservable as any)(...args);
}
