import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MobxAngularModule } from 'mobx-angular';
import { Account } from './stores/account.store';
import { AppComponent } from './app.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [
    AppComponent,
    BalanceComponent,
    TransactionsComponent,
    ActionsComponent
  ],
  imports: [
    BrowserModule,
    MobxAngularModule,
    FormsModule,
    CommonModule
  ],
  providers: [Account],
  bootstrap: [AppComponent]
})
export class AppModule { }
