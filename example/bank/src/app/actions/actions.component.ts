import { Component } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-actions',
  template: `
    <input type="number" [(ngModel)]="amount"/><br>
    <button mat-raised-button (click)="account.deposit(amount)">deposit</button>
    <button mat-raised-button (click)="account.withdraw(amount)">withdraw</button>
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
