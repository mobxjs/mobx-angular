import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobxAngularModule } from 'mobx-angular';
import { NgModule } from '@angular/core';
import { Account } from './stores/account.store';
import { AppComponent } from './app.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ActionsComponent } from './actions/actions.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule } from '@angular/material';

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
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [Account],
  bootstrap: [AppComponent]
})
export class AppModule { }
