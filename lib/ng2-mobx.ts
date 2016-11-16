import { Directive, ViewContainerRef, TemplateRef, Input, NgModule } from '@angular/core';
import { autorun, reaction, autorunAsync } from 'mobx';

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

const DIRECTIVES = [MobxAutorunDirective, MobxAutorunSyncDirective, MobxReactionDirective];
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
