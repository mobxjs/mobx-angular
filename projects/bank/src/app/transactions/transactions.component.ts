import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-transactions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *mobxAutorun class="transactions">
      <mat-card appearance="outlined" class="column">
        <mat-card-header>
          <mat-card-title>Deposits</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngFor="let deposit of account.deposits">{{ deposit }}</div>
        </mat-card-content>
      </mat-card>
      <mat-card appearance="outlined" class="column">
        <mat-card-header>
          <mat-card-title>Withdrawls</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngFor="let withdrawl of account.withdrawls">
            {{ withdrawl }}
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .transactions {
        display: flex;
        flex-direction: row;
      }
    `,
    `
      .column {
        width: 120px;
        margin-top: 20px;
        margin-right: 20px;
      }
    `
  ]
})
export class TransactionsComponent implements OnInit {
  constructor(public account: Account) {}

  ngOnInit() {}
}
