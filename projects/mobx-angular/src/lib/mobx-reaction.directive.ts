import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { IReactionOptions, reaction } from 'mobx';
import { MobxAutorunDirective } from './mobx-autorun.directive';

@Directive({ selector: '[mobxReaction]' })
export class MobxReactionDirective extends MobxAutorunDirective {
  private readonly allReactionOptions: Array<keyof IReactionOptions> = [
    'name',
    'requiresObservable',
    'scheduler',
    'delay',
    'equals',
    'fireImmediately',
    'onError'
  ];
  @Input() mobxReaction;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {
    super(templateRef, viewContainer);
  }

  autoDetect(view) {
    const opts: IReactionOptions = this.getReactionOptions();

    this.dispose = reaction(
      this.mobxReaction.dataFn,
      () => {
        view.detectChanges();
      },
      opts
    );
  }

  getReactionOptions(): IReactionOptions {
    return Object.keys(this.mobxReaction || {}).reduce(
      (opts, current) => {
        if (
          this.allReactionOptions.includes(current as keyof IReactionOptions)
        ) {
          opts[current] = this.mobxReaction[current];
        }
        return opts;
      },
      { fireImmediately: true }
    );
  }
}
