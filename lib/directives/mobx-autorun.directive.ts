import { Directive, ViewContainerRef, TemplateRef, HostListener, Renderer, OnInit, OnDestroy } from '@angular/core';
import { autorun } from 'mobx';
import { mobxAngularDebug } from '../utils/mobx-angular-debug';

@Directive({ selector: '[mobxAutorun]' })
export class MobxAutorunDirective implements OnInit, OnDestroy {
  protected templateBindings = {};
  protected dispose: any;
  protected view: any;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected renderer: Renderer) {
    }

  ngOnInit() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.dispose) this.dispose();

    this.autoDetect(this.view);
    mobxAngularDebug(this.view, this.renderer, this.dispose);
  }

  autoDetect(view) {
    const autorunName = view._view.component
      ? `${view._view.component.constructor.name}.detectChanges()` // angular 4+
      : `${view._view.parentView.context.constructor.name}.detectChanges()`; // angular 2

    this.dispose = autorun(
      autorunName,
      () => view['detectChanges']()
    );
  }

  ngOnDestroy() {
    if (this.dispose) this.dispose();
  }
}
