import { Component } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-actions',
  template: `
    <mat-form-field>
      <input matInput placeholder="amount" type="number" [(ngModel)]="amount"/>
    </mat-form-field>
    <div>
      <button mat-raised-button (click)="account.deposit(amount)">deposit</button>
      <button mat-raised-button (click)="account.withdraw(amount)">withdraw</button>
    </div>
  `,
  styles: [
    `button {
      width: 120px;
      margin-right: 16px;
    }`
  ]
})
export class ActionsComponent {

  constructor(private account: Account) { }
}
