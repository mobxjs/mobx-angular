var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Directive, ViewContainerRef, TemplateRef, Input, Renderer } from '@angular/core';
import { reaction } from 'mobx';
import { MobxAutorunDirective } from './mobx-autorun.directive';
var MobxReactionDirective = (function (_super) {
    __extends(MobxReactionDirective, _super);
    function MobxReactionDirective(templateRef, viewContainer, renderer) {
        var _this = _super.call(this, templateRef, viewContainer, renderer) || this;
        _this.templateRef = templateRef;
        _this.viewContainer = viewContainer;
        _this.renderer = renderer;
        return _this;
    }
    MobxReactionDirective.prototype.autoDetect = function (view) {
        this.dispose = reaction(this.mobxReaction, function () {
            view['detectChanges']();
        }, { fireImmediately: true });
    };
    return MobxReactionDirective;
}(MobxAutorunDirective));
export { MobxReactionDirective };
MobxReactionDirective.decorators = [
    { type: Directive, args: [{ selector: '[mobxReaction]' },] },
];
/** @nocollapse */
MobxReactionDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: Renderer, },
]; };
MobxReactionDirective.propDecorators = {
    'mobxReaction': [{ type: Input },],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL21vYngtcmVhY3Rpb24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBQSxFQUFXLGdCQUFBLEVBQWtCLFdBQUEsRUFBYSxLQUFBLEVBQU8sUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUMxRixPQUFPLEVBQUUsUUFBQSxFQUFTLE1BQU8sTUFBQSxDQUFPO0FBQ2hDLE9BQU8sRUFBQSxvQkFBRSxFQUFvQixNQUFNLDBCQUFBLENBQTJCO0FBRzlEO0lBQTJDLHlDQUFvQjtJQUc3RCwrQkFDWSxXQUE2QixFQUM3QixhQUErQixFQUMvQixRQUFrQjtRQUg5QixZQUdpQyxrQkFBTSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxTQUFHO1FBRm5FLGlCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsY0FBUSxHQUFSLFFBQVEsQ0FBVTs7SUFBZ0QsQ0FBQztJQUUvRSwwQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDekMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQWFILDRCQUFDO0FBQUQsQ0F6QkEsQUF5QkMsQ0F6QjBDLG9CQUFvQjs7QUFheEQsZ0NBQVUsR0FBMEI7SUFDM0MsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLEVBQUcsRUFBRTtDQUM1RCxDQUFDO0FBQ0Ysa0JBQWtCO0FBQ1gsb0NBQWMsR0FBbUUsY0FBTSxPQUFBO0lBQzlGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztJQUNyQixFQUFDLElBQUksRUFBRSxnQkFBZ0IsR0FBRztJQUMxQixFQUFDLElBQUksRUFBRSxRQUFRLEdBQUc7Q0FDakIsRUFKNkYsQ0FJN0YsQ0FBQztBQUNLLG9DQUFjLEdBQTJDO0lBQ2hFLGNBQWMsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0NBQ2pDLENBQUMiLCJmaWxlIjoibW9ieC1yZWFjdGlvbi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBWaWV3Q29udGFpbmVyUmVmLCBUZW1wbGF0ZVJlZiwgSW5wdXQsIFJlbmRlcmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyByZWFjdGlvbiB9IGZyb20gJ21vYngnO1xuaW1wb3J0IHtNb2J4QXV0b3J1bkRpcmVjdGl2ZX0gZnJvbSAnLi9tb2J4LWF1dG9ydW4uZGlyZWN0aXZlJztcblxuXG5leHBvcnQgY2xhc3MgTW9ieFJlYWN0aW9uRGlyZWN0aXZlIGV4dGVuZHMgTW9ieEF1dG9ydW5EaXJlY3RpdmUge1xuICAgbW9ieFJlYWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcm90ZWN0ZWQgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyKSB7c3VwZXIodGVtcGxhdGVSZWYsIHZpZXdDb250YWluZXIsIHJlbmRlcmVyKTsgfVxuXG4gIGF1dG9EZXRlY3Qodmlldykge1xuICAgIHRoaXMuZGlzcG9zZSA9IHJlYWN0aW9uKHRoaXMubW9ieFJlYWN0aW9uLCAoKSA9PiB7XG4gICAgICB2aWV3WydkZXRlY3RDaGFuZ2VzJ10oKTtcbiAgICB9LCB7IGZpcmVJbW1lZGlhdGVseTogdHJ1ZSB9KTtcbiAgfVxuc3RhdGljIGRlY29yYXRvcnM6IERlY29yYXRvckludm9jYXRpb25bXSA9IFtcbnsgdHlwZTogRGlyZWN0aXZlLCBhcmdzOiBbeyBzZWxlY3RvcjogJ1ttb2J4UmVhY3Rpb25dJyB9LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICgpID0+ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gKCkgPT4gW1xue3R5cGU6IFRlbXBsYXRlUmVmLCB9LFxue3R5cGU6IFZpZXdDb250YWluZXJSZWYsIH0sXG57dHlwZTogUmVuZGVyZXIsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidtb2J4UmVhY3Rpb24nOiBbeyB0eXBlOiBJbnB1dCB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=