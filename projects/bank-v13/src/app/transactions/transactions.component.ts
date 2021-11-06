import { Component, OnInit } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  constructor(public account: Account) {}

  ngOnInit(): void {}
}
