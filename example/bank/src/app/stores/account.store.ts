import { Injectable } from '@angular/core';
import { observable, computed, action, toJS, useStrict } from 'mobx';
import { sum } from 'lodash';

useStrict(true);

@Injectable()
export class Account {
  @observable transactions: number[] = [];

  @computed get balance(): number {
    return sum(this.transactions);
  }

  @computed get isNegative(): boolean {
    return this.balance < 0;
  }

  @action deposit(money: number) {
    this.transactions = [...this.transactions, money];
  }

  @action withdraw(money: number) {
    this.transactions = [...this.transactions, -money];
  }
}
