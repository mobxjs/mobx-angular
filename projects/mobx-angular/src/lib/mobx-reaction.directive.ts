import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { IReactionOptions, reaction } from 'mobx';
import { MobxAutorunDirective } from './mobx-autorun.directive';

@Directive({ selector: '[mobxReaction]' })
export class MobxReactionDirective extends MobxAutorunDirective {
  @Input() mobxReaction;
  @Input() mobxReactionOptions: IReactionOptions;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {
    super(templateRef, viewContainer);
  }

  autoDetect(view) {
    const opts: IReactionOptions = Object.assign(
      { fireImmediately: true },
      this.mobxReactionOptions
    );

    this.dispose = reaction(
      this.mobxReaction,
      () => {
        view.detectChanges();
      },
      opts
    );
  }
}
