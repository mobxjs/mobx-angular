import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { reaction } from 'mobx';
import {MobxAutorunDirective} from './mobx-autorun.directive';

@Directive({ selector: '[mobxReaction]' })
export class MobxReactionDirective extends MobxAutorunDirective {
  @Input() mobxReaction;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef) {super(templateRef, viewContainer); }

  autoDetect(view) {
    this.dispose = reaction(this.mobxReaction, () => {
      view['detectChanges']();
    }, { fireImmediately: true });
  }
}
