import { Directive, ViewContainerRef, TemplateRef, HostListener, Renderer } from '@angular/core';
import { autorunAsync } from 'mobx';
import { ng2MobxDebug } from '../utils/ng2-mobx-debug';

@Directive({ selector: '[mobxAutorun]' })
export class MobxAutorunDirective {
  protected templateBindings = {};
  protected dispose:any;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected renderer:Renderer) {}

  ngAfterViewInit() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.dispose) this.dispose();

    this.autoDetect(view);
    ng2MobxDebug(view, this.renderer, this.dispose);
  }

  autoDetect(view) {
    this.dispose = autorunAsync(() => {
      view["detectChanges"]();
    });
  }

  ngOnDestroy() {
    if (this.dispose) this.dispose();
  }
}
