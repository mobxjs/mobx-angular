import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { autorun } from 'mobx';
import {MobxAutorunDirective} from './mobx-autorun.directive';

@Directive({ selector: '[mobxAutorunSync]' })
export class MobxAutorunSyncDirective extends MobxAutorunDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef) {super(templateRef, viewContainer)}
  autoDetect(view) {
    this.dispose = autorun(() => {
      view["detectChanges"]();
    });
  }
}
