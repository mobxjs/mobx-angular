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
import { Directive, ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import { autorun } from 'mobx';
import { MobxAutorunDirective } from './mobx-autorun.directive';
var MobxAutorunSyncDirective = (function (_super) {
    __extends(MobxAutorunSyncDirective, _super);
    function MobxAutorunSyncDirective(templateRef, viewContainer, renderer) {
        var _this = _super.call(this, templateRef, viewContainer, renderer) || this;
        _this.templateRef = templateRef;
        _this.viewContainer = viewContainer;
        _this.renderer = renderer;
        return _this;
    }
    MobxAutorunSyncDirective.prototype.autoDetect = function (view) {
        console.warn('mobxAutorunSync is deprected, please use mobxAutorun instead - it\'s doing exactly the same thing');
        this.dispose = autorun(function () {
            view['detectChanges']();
        });
    };
    return MobxAutorunSyncDirective;
}(MobxAutorunDirective));
export { MobxAutorunSyncDirective };
MobxAutorunSyncDirective.decorators = [
    { type: Directive, args: [{ selector: '[mobxAutorunSync]' },] },
];
/** @nocollapse */
MobxAutorunSyncDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: Renderer, },
]; };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9kaXJlY3RpdmVzL21vYngtYXV0b3J1bi1zeW5jLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQUEsRUFBVyxnQkFBQSxFQUFrQixXQUFBLEVBQWEsUUFBQSxFQUFTLE1BQU8sZUFBQSxDQUFnQjtBQUNuRixPQUFPLEVBQUUsT0FBQSxFQUFRLE1BQU8sTUFBQSxDQUFPO0FBQy9CLE9BQU8sRUFBQSxvQkFBRSxFQUFvQixNQUFNLDBCQUFBLENBQTJCO0FBRzlEO0lBQThDLDRDQUFvQjtJQUNoRSxrQ0FDWSxXQUE2QixFQUM3QixhQUErQixFQUMvQixRQUFrQjtRQUg5QixZQUdpQyxrQkFBTSxXQUFXLEVBQUUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxTQUFHO1FBRm5FLGlCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixtQkFBYSxHQUFiLGFBQWEsQ0FBa0I7UUFDL0IsY0FBUSxHQUFSLFFBQVEsQ0FBVTs7SUFBZ0QsQ0FBQztJQUUvRSw2Q0FBVSxHQUFWLFVBQVcsSUFBSTtRQUNiLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUdBQW1HLENBQUMsQ0FBQztRQUVsSCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFVSCwrQkFBQztBQUFELENBdEJBLEFBc0JDLENBdEI2QyxvQkFBb0I7O0FBYTNELG1DQUFVLEdBQTBCO0lBQzNDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxFQUFHLEVBQUU7Q0FDL0QsQ0FBQztBQUNGLGtCQUFrQjtBQUNYLHVDQUFjLEdBQW1FLGNBQU0sT0FBQTtJQUM5RixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7SUFDckIsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEdBQUc7SUFDMUIsRUFBQyxJQUFJLEVBQUUsUUFBUSxHQUFHO0NBQ2pCLEVBSjZGLENBSTdGLENBQUMiLCJmaWxlIjoibW9ieC1hdXRvcnVuLXN5bmMuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgVmlld0NvbnRhaW5lclJlZiwgVGVtcGxhdGVSZWYsIFJlbmRlcmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBhdXRvcnVuIH0gZnJvbSAnbW9ieCc7XG5pbXBvcnQge01vYnhBdXRvcnVuRGlyZWN0aXZlfSBmcm9tICcuL21vYngtYXV0b3J1bi5kaXJlY3RpdmUnO1xuXG5cbmV4cG9ydCBjbGFzcyBNb2J4QXV0b3J1blN5bmNEaXJlY3RpdmUgZXh0ZW5kcyBNb2J4QXV0b3J1bkRpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PixcbiAgICBwcm90ZWN0ZWQgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyKSB7c3VwZXIodGVtcGxhdGVSZWYsIHZpZXdDb250YWluZXIsIHJlbmRlcmVyKTsgfVxuXG4gIGF1dG9EZXRlY3Qodmlldykge1xuICAgIGNvbnNvbGUud2FybignbW9ieEF1dG9ydW5TeW5jIGlzIGRlcHJlY3RlZCwgcGxlYXNlIHVzZSBtb2J4QXV0b3J1biBpbnN0ZWFkIC0gaXRcXCdzIGRvaW5nIGV4YWN0bHkgdGhlIHNhbWUgdGhpbmcnKTtcblxuICAgIHRoaXMuZGlzcG9zZSA9IGF1dG9ydW4oKCkgPT4ge1xuICAgICAgdmlld1snZGV0ZWN0Q2hhbmdlcyddKCk7XG4gICAgfSk7XG4gIH1cbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IERpcmVjdGl2ZSwgYXJnczogW3sgc2VsZWN0b3I6ICdbbW9ieEF1dG9ydW5TeW5jXScgfSwgXSB9LFxuXTtcbi8qKiBAbm9jb2xsYXBzZSAqL1xuc3RhdGljIGN0b3JQYXJhbWV0ZXJzOiAoKSA9PiAoe3R5cGU6IGFueSwgZGVjb3JhdG9ycz86IERlY29yYXRvckludm9jYXRpb25bXX18bnVsbClbXSA9ICgpID0+IFtcbnt0eXBlOiBUZW1wbGF0ZVJlZiwgfSxcbnt0eXBlOiBWaWV3Q29udGFpbmVyUmVmLCB9LFxue3R5cGU6IFJlbmRlcmVyLCB9LFxuXTtcbn1cblxuaW50ZXJmYWNlIERlY29yYXRvckludm9jYXRpb24ge1xuICB0eXBlOiBGdW5jdGlvbjtcbiAgYXJncz86IGFueVtdO1xufVxuIl19