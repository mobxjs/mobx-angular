import { ViewContainerRef, TemplateRef, Renderer, OnInit, OnDestroy } from '@angular/core';
export declare class MobxAutorunDirective implements OnInit, OnDestroy {
    protected templateRef: TemplateRef<any>;
    protected viewContainer: ViewContainerRef;
    protected renderer: Renderer;
    protected templateBindings: {};
    protected dispose: any;
    protected view: any;
    constructor(templateRef: TemplateRef<any>, viewContainer: ViewContainerRef, renderer: Renderer);
    ngOnInit(): void;
    autoDetect(view: any): void;
    ngOnDestroy(): void;
}
