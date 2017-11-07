import { Component } from '@angular/core';
import { Account } from '../stores/account.store';
// import { extras } from 'mobx';

@Component({
  selector: 'app-balance',
  template: `
    <p>
      Your bank account balance:
      <span [class.negative]="account.isNegative()">$ {{ account.getBalance() }}</span>
    </p>
  `,
  styles: [
    `
    span {
      color: green;
    }`,
    `.negative {
      color: red;
    }`
  ]
})
export class BalanceComponent {

  constructor(private account: Account) { }

}
