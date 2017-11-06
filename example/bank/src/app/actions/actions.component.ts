import { Component } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-actions',
  template: `
    <button mat-raised-button (click)="deposit()">deposit</button>
    <button mat-raised-button (click)="withdraw()">withdraw</button>
  `,
  styles: [
    `button {
      width: 128px;
      margin-right: 16px;
    }`
  ]
})
export class ActionsComponent {

  constructor(private account: Account) { }

  deposit() {
    this.account.deposit(parseInt(window.prompt('select amount')));
  }
  withdraw() {
    this.account.withdraw(parseInt(window.prompt('select amount')));
  }
}
