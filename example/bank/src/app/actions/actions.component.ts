import { Component, OnInit } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-actions',
  template: `
    <input type="number" [(ngModel)]="amount"/>
    <button (click)="account.deposit(amount)">deposit</button>
    <button (click)="account.withdraw(amount)">withdraw</button>
  `
})
export class ActionsComponent implements OnInit {

  constructor(private account: Account) { }

  ngOnInit() {
  }

}
