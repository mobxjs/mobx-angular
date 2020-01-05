import {
  Directive,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  OnDestroy,
  Input,
  EmbeddedViewRef
} from '@angular/core';
import { autorun } from 'mobx';
// import { mobxAngularDebug } from '../utils/mobx-angular-debug';

@Directive({ selector: '[mobxAutorun]' })
export class MobxAutorunDirective implements OnInit, OnDestroy {
  protected templateBindings = {};
  protected dispose: any;
  protected view: EmbeddedViewRef<any>;
  @Input() mobxAutorun;

  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.view = this.viewContainer.createEmbeddedView(this.templateRef);

    if (this.dispose) this.dispose();

    if (this.shouldDetach()) {
      this.view.detach();
    }
    this.autoDetect(this.view);
    // mobxAngularDebug(this.view, this.dispose);
  }

  shouldDetach() {
    return this.mobxAutorun && this.mobxAutorun.detach;
  }

  autoDetect(view: EmbeddedViewRef<any>) {
    this.dispose = autorun(() => view.detectChanges());
  }

  ngOnDestroy() {
    if (this.dispose) this.dispose();
  }
}
