import { Directive, ViewContainerRef, TemplateRef, Input, NgModule } from '@angular/core';
import { autorun, reaction } from 'mobx';

@Directive({ selector: '[mobxAutorun]' })
class MobxAutorunDirective {
  private templateBindings = {};
  private dispose:any;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {}

  ngAfterViewInit() {
    const view = this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.dispose) this.dispose();

    this.dispose = autorun(() => {
      view['detectChanges']();
    });
  }

  ngOnDestroy() {
    this.dispose();
  }
}

@Directive({ selector: '[mobxReaction]' })
class MobxReactionDirective {
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

const DIRECTIVES = [MobxAutorunDirective, MobxReactionDirective];
@NgModule({
  declarations: [
    DIRECTIVES
  ],
  exports: [
    DIRECTIVES
  ]
})
export class Ng2MobxModule {
}
