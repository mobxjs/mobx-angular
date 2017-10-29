import { Component, OnInit } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-transactions',
  template: `
    <div  *mobxAutorun class="transactions">
      <div class="column">
        <h2>Deposits</h2>
        <div *ngFor="let deposit of account.deposits">{{ deposit }}</div>
      </div>
      <div class="column">
        <h2>Withdrawls</h2>
        <div *ngFor="let withdrawl of account.withdrawls">{{ withdrawl }}</div>
      </div>
    </div>
  `,
  styles: [
    `.transactions {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }`,
    `.column {
      margin: 20px 50px;
    }`
  ]
})
export class TransactionsComponent implements OnInit {

  constructor(private account: Account) { }

  ngOnInit() {
  }

}
