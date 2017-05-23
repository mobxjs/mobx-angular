import { MobxAutorunDirective } from './directives/mobx-autorun.directive';
import { MobxAutorunSyncDirective } from './directives/mobx-autorun-sync.directive';
import { MobxReactionDirective } from './directives/mobx-reaction.directive';
export { MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective };
export declare class MobxAngularModule {
}
export declare function action(...args: any[]): any;
export declare function computed(...args: any[]): any;
export declare function observable(...args: any[]): any;
