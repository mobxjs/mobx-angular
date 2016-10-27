import { Directive, ViewContainerRef, TemplateRef, NgModule } from '@angular/core';
import { autorun } from 'mobx';

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

@NgModule({
  declarations: [
    MobxAutorunDirective
  ],
  exports: [
    MobxAutorunDirective
  ]
})
export class Ng2MobxModule {
}
