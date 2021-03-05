import { Component, OnInit } from '@angular/core';
import { Account } from '../stores/account.store';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  constructor(public account: Account) {}

  ngOnInit(): void {}
}
