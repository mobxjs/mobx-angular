import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { autorunAsync } from 'mobx';

@Directive({ selector: '[mobxAutorun]' })
export class MobxAutorunDirective {
  protected templateBindings = {};
  protected dispose:any;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef) {}

  ngAfterViewInit() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.dispose) this.dispose();

    this.autoDetect(view);
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
