import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-transactions',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="transactions">
      <mat-card class="column">
        <mat-card-header>
          <mat-card-title>Transactions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngFor="let transaction of account.transactions">{{ transaction }}</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `.transactions {
      display: flex;
      flex-direction: row;
    }`,
    `.column {
      width: 228px;
      margin-top: 20px;
    }`
  ]
})
export class TransactionsComponent {

  constructor(private account: Account) { }

}
