import { NgModule } from '@angular/core';
import {MobxAutorunDirective} from './directives/mobx-autorun.directive';
import {MobxAutorunSyncDirective} from './directives/mobx-autorun-sync.directive';
import {MobxReactionDirective} from './directives/mobx-reaction.directive';

export {
  MobxAutorunDirective,
  MobxAutorunSyncDirective,
  MobxReactionDirective
}

const DIRECTIVES = [MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective];
@NgModule({
  declarations: [
    DIRECTIVES
  ],
  exports: [
    DIRECTIVES
  ],
  imports: [],
  providers: []
})
export class Ng2MobxModule {
}
