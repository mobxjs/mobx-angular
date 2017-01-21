import { Directive, ViewContainerRef, TemplateRef, Input } from '@angular/core';
import { reaction } from 'mobx';

@Directive({ selector: '[mobxReaction]' })
export class MobxReactionDirective {
  private templateBindings = {};
  private dispose:any;

  @Input() mobxReaction;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {}

  ngAfterViewInit() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.dispose) this.dispose();

    this.dispose = reaction(this.mobxReaction, () => {
      view['detectChanges']();
    });
  }

  ngOnDestroy() {
    this.dispose();
  }
}
