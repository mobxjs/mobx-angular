import { Directive, ViewContainerRef, TemplateRef, Input, Renderer } from '@angular/core';
import { reaction } from 'mobx';
import {MobxAutorunDirective} from './mobx-autorun.directive';

@Directive({ selector: '[mobxReaction]' })
export class MobxReactionDirective extends MobxAutorunDirective {
  @Input() mobxReaction;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected renderer: Renderer) {super(templateRef, viewContainer, renderer); }

  autoDetect(view) {
    this.dispose = reaction(this.mobxReaction, () => {
      view['detectChanges']();
    }, { fireImmediately: true });
  }
}
