import { Component } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-actions',
  template: `
    <button mat-raised-button (click)="account.deposit(100)">deposit 100</button>
    <button mat-raised-button (click)="account.withdraw(100)">withdraw 100</button>
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
}
