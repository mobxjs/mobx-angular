import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import remotedev from 'mobx-remotedev/lib/dev';

import { MobxAngularModule } from 'mobx-angular';
import { Todos } from './stores/todos.store';
import { AppComponent } from './app.component';
import { SectionComponent } from './components/section/section.component';
import { FooterComponent } from './components/footer/footer.component';
import { CountComponent } from './components/count/count.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    FooterComponent,
    CountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MobxAngularModule
  ],
  providers: [Todos],
  // providers: [{ provide: Todos, useClass: remotedev(Todos) }],
  bootstrap: [AppComponent]
})
export class AppModule { }
