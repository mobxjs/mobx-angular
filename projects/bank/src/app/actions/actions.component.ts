import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button mat-raised-button (click)="deposit()">deposit</button>
    <button mat-raised-button (click)="withdraw()">withdraw</button>
  `,
  styles: [
    `
      button {
        width: 152px;
        margin-right: 20px;
      }
    `
  ]
})
export class ActionsComponent implements OnInit {
  constructor(private account: Account) {}

  deposit() {
    this.account.deposit(parseInt(window.prompt('select amount'), 10));
  }
  withdraw() {
    this.account.withdraw(parseInt(window.prompt('select amount'), 10));
  }
  ngOnInit() {}
}
