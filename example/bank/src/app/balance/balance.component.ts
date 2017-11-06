import { Component } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-balance',
  template: `
    <p>
      Your current balance:
      <span [class.negative]="account.isNegative">$ {{ account.balance }}</span>
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
