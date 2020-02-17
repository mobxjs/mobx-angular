import { NgModule } from '@angular/core';
import { MobxAutorunDirective } from './mobx-autorun.directive';
import { MobxReactionDirective } from './mobx-reaction.directive';

const DIRECTIVES = [MobxAutorunDirective, MobxReactionDirective];
@NgModule({
  declarations: DIRECTIVES,
  exports: DIRECTIVES
})
export class MobxAngularModule {}
