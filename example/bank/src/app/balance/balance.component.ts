import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-balance',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <p>
        Your bank account balance: $ {{ account.getBalance() }}
      </p>
      <p class="negative" *ngIf="account.isNegative()">
        Your account is in overdraft
      </p>
    </div>
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
  count() {
    console.count('detect changes');
  }
}
