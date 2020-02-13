import { NgModule } from '@angular/core';
import { MobxAutorunDirective } from './mobx-autorun.directive';
import { MobxAutorunSyncDirective } from './mobx-autorun-sync.directive';
import { MobxReactionDirective } from './mobx-reaction.directive';

const DIRECTIVES = [
  MobxAutorunDirective,
  MobxAutorunSyncDirective,
  MobxReactionDirective
];
@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class MobxAngularModule {}
