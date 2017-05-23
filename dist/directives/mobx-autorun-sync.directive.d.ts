import { ViewContainerRef, TemplateRef, Renderer } from '@angular/core';
import { MobxAutorunDirective } from './mobx-autorun.directive';
export declare class MobxAutorunSyncDirective extends MobxAutorunDirective {
    protected templateRef: TemplateRef<any>;
    protected viewContainer: ViewContainerRef;
    protected renderer: Renderer;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, renderer: Renderer);
    autoDetect(view: any): void;
}
