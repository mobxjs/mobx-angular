import { NgModule } from '@angular/core';
import { MobxAutorunDirective } from './directives/mobx-autorun.directive';
import { MobxAutorunSyncDirective } from './directives/mobx-autorun-sync.directive';
import { MobxReactionDirective } from './directives/mobx-reaction.directive';
import { action as mobxAction } from 'mobx';
import { computed as mobxComputed } from 'mobx';
import { observable as mobxObservable } from 'mobx';
export { MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective };
var DIRECTIVES = [MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective];
var MobxAngularModule = (function () {
    function MobxAngularModule() {
    }
    return MobxAngularModule;
}());
export { MobxAngularModule };
MobxAngularModule.decorators = [
    { type: NgModule, args: [{
                declarations: DIRECTIVES.slice(),
                exports: DIRECTIVES.slice(),
                imports: [],
                providers: []
            },] },
];
/** @nocollapse */
MobxAngularModule.ctorParameters = function () { return []; };
export function action() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return mobxAction.apply(void 0, args);
}
export function computed() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return mobxComputed.apply(void 0, args);
}
export function observable() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return mobxObservable.apply(void 0, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9tb2J4LWFuZ3VsYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQUEsRUFBUyxNQUFPLGVBQUEsQ0FBZ0I7QUFDekMsT0FBTyxFQUFBLG9CQUFFLEVBQW9CLE1BQU0scUNBQUEsQ0FBc0M7QUFDekUsT0FBTyxFQUFBLHdCQUFFLEVBQXdCLE1BQU0sMENBQUEsQ0FBMkM7QUFDbEYsT0FBTyxFQUFBLHFCQUFFLEVBQXFCLE1BQU0sc0NBQUEsQ0FBdUM7QUFDM0UsT0FBTyxFQUFBLE1BQUUsSUFBUyxVQUFBLEVBQVcsTUFBTSxNQUFBLENBQU87QUFDMUMsT0FBTyxFQUFBLFFBQUUsSUFBVyxZQUFBLEVBQWEsTUFBTSxNQUFBLENBQU87QUFDOUMsT0FBTyxFQUFBLFVBQUUsSUFBYSxjQUFBLEVBQWUsTUFBTSxNQUFBLENBQU87QUFFbEQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQix3QkFBd0IsRUFDeEIscUJBQXFCLEVBQ3RCLENBQUE7QUFFRCxJQUFNLFVBQUEsR0FBYSxDQUFBLG9CQUFFLEVBQXFCLHdCQUFBLEVBQTBCLHFCQUFBLENBQXNCLENBQUM7QUFFM0Y7SUFBQTtJQWdCQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQWhCQSxBQWdCQzs7QUFmTSw0QkFBVSxHQUEwQjtJQUMzQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBQ3ZCLFlBQVksRUFDUCxVQUFVLFFBQ2Q7Z0JBQ0QsT0FBTyxFQUNGLFVBQVUsUUFDZDtnQkFDRCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUUsRUFBRTthQUNkLEVBQUcsRUFBRTtDQUNMLENBQUM7QUFDRixrQkFBa0I7QUFDWCxnQ0FBYyxHQUFtRSxjQUFNLE9BQUEsRUFDN0YsRUFENkYsQ0FDN0YsQ0FBQztBQUdGLE1BQU07SUFOaUIsY0FBSTtTQUFKLFVBQUksRUFBSixxQkFBSSxFQUFKLElBQUk7UUFBSix5QkFBSTs7SUFPekIsTUFBTSxDQU5DLFVBQW1CLGVBQUUsSUFBRyxFQUFLO0FBT3RDLENBQUM7QUFFRCxNQUFNO0lBTm1CLGNBQUk7U0FBSixVQUFJLEVBQUoscUJBQUksRUFBSixJQUFJO1FBQUoseUJBQUk7O0lBTzNCLE1BQU0sQ0FOQyxZQUFxQixlQUFFLElBQUcsRUFBSztBQU94QyxDQUFDO0FBRUQsTUFBTTtJQU5xQixjQUFJO1NBQUosVUFBSSxFQUFKLHFCQUFJLEVBQUosSUFBSTtRQUFKLHlCQUFJOztJQU83QixNQUFNLENBTkMsY0FBdUIsZUFBRSxJQUFHLEVBQUs7QUFPMUMsQ0FBQyIsImZpbGUiOiJtb2J4LWFuZ3VsYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TW9ieEF1dG9ydW5EaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9tb2J4LWF1dG9ydW4uZGlyZWN0aXZlJztcbmltcG9ydCB7TW9ieEF1dG9ydW5TeW5jRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9ieC1hdXRvcnVuLXN5bmMuZGlyZWN0aXZlJztcbmltcG9ydCB7TW9ieFJlYWN0aW9uRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9ieC1yZWFjdGlvbi5kaXJlY3RpdmUnO1xuaW1wb3J0IHthY3Rpb24gYXMgbW9ieEFjdGlvbn0gZnJvbSAnbW9ieCc7XG5pbXBvcnQge2NvbXB1dGVkIGFzIG1vYnhDb21wdXRlZH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQge29ic2VydmFibGUgYXMgbW9ieE9ic2VydmFibGV9IGZyb20gJ21vYngnO1xuXG5leHBvcnQge1xuICBNb2J4QXV0b3J1bkRpcmVjdGl2ZSxcbiAgTW9ieEF1dG9ydW5TeW5jRGlyZWN0aXZlLFxuICBNb2J4UmVhY3Rpb25EaXJlY3RpdmVcbn1cblxuY29uc3QgRElSRUNUSVZFUyA9IFtNb2J4QXV0b3J1bkRpcmVjdGl2ZSwgTW9ieEF1dG9ydW5TeW5jRGlyZWN0aXZlLCBNb2J4UmVhY3Rpb25EaXJlY3RpdmVdO1xuXG5leHBvcnQgY2xhc3MgTW9ieEFuZ3VsYXJNb2R1bGUge1xuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogTmdNb2R1bGUsIGFyZ3M6IFt7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIC4uLkRJUkVDVElWRVNcbiAgXSxcbiAgaW1wb3J0czogW10sXG4gIHByb3ZpZGVyczogW11cbn0sIF0gfSxcbl07XG4vKiogQG5vY29sbGFwc2UgKi9cbnN0YXRpYyBjdG9yUGFyYW1ldGVyczogKCkgPT4gKHt0eXBlOiBhbnksIGRlY29yYXRvcnM/OiBEZWNvcmF0b3JJbnZvY2F0aW9uW119fG51bGwpW10gPSAoKSA9PiBbXG5dO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aW9uKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIChtb2J4QWN0aW9uIGFzIGFueSkoLi4uYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlZCguLi5hcmdzKSB7XG4gIHJldHVybiAobW9ieENvbXB1dGVkIGFzIGFueSkoLi4uYXJncyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZhYmxlKC4uLmFyZ3MpIHtcbiAgcmV0dXJuIChtb2J4T2JzZXJ2YWJsZSBhcyBhbnkpKC4uLmFyZ3MpO1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=