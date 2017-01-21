import { Directive, ViewContainerRef, TemplateRef, Input, Renderer } from '@angular/core';
import { reaction } from 'mobx';
import {MobxAutorunDirective} from './mobx-autorun.directive';

@Directive({ selector: '[mobxReaction]' })
export class MobxReactionDirective extends MobxAutorunDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef,
    protected renderer:Renderer) {super(templateRef, viewContainer, renderer)}

  @Input() mobxReaction;

  autoDetect(view) {
    this.dispose = reaction(this.mobxReaction, () => {
      view['detectChanges']();
    }, { fireImmediately: true });
  }
}
