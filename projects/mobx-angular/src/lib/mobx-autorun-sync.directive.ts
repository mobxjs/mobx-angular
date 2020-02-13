import { Directive, ViewContainerRef, TemplateRef } from '@angular/core';
import { autorun } from 'mobx';
import { MobxAutorunDirective } from './mobx-autorun.directive';

@Directive({ selector: '[mobxAutorunSync]' })
export class MobxAutorunSyncDirective extends MobxAutorunDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {
    super(templateRef, viewContainer);
  }

  autoDetect(view) {
    // prettier-ignore
    console.warn('mobxAutorunSync is deprecated, please use mobxAutorun instead - it\'s doing exactly the same thing');

    this.dispose = autorun(() => {
      view.detectChanges();
    });
  }
}
