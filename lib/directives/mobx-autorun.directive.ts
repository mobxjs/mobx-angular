import { Directive, ViewContainerRef, TemplateRef, HostListener, Renderer, OnInit, OnDestroy } from '@angular/core';
import { autorun } from 'mobx';
import { ng2MobxDebug } from '../utils/ng2-mobx-debug';

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
    ng2MobxDebug(this.view, this.renderer, this.dispose);
  }

  autoDetect(view) {
    this.dispose = autorun(() => {
      view['detectChanges']();
    });
  }

  ngOnDestroy() {
    if (this.dispose) this.dispose();
  }
}
