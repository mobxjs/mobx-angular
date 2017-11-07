import { Component } from '@angular/core';
import { Account } from '../stores/account.store';
import { autorun, extras } from 'mobx';

@Component({
  selector: 'app-balance',
  template: `
    <p>
      Your bank account balance: $ {{ account.getBalance() }}
    </p>
    <p class="negative" *ngIf="account.isNegative()">
      Your account is in overdraft
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

  constructor(private account: Account) {
    // autorun(() => {
    //   console.log(account.balance);
    // });
    // const observer = autorun(() => {
    //   console.log(account.isNegative);
    // });
    // console.log(extras.getDependencyTree(observer));
  }
  // count() {
  //   console.count('detect changes');
  // }
}
