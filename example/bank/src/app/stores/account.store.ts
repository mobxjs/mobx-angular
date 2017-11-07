import { Injectable } from '@angular/core';
// import { observable, computed, action } from 'mobx';
import { sum } from 'lodash';

@Injectable()
export class Account {
  transactions: number[] = [];

  getBalance(): number {
    return sum(this.transactions);
  }

  isNegative(): boolean {
    return this.getBalance() < 0;
  }

  deposit(money: number) {
    this.transactions = [...this.transactions, money];
  }

  withdraw(money: number) {
    this.transactions = [...this.transactions, -money];
  }
}
