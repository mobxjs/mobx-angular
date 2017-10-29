import { Injectable } from '@angular/core';
import { observable, autorun, computed, action, reaction, when, toJS } from 'mobx';
import { sum } from 'lodash';

@Injectable()
export class Account {
  @observable transactions = [];

  constructor() {
    if (localStorage.savedTransactions) {
      this.transactions = JSON.parse(localStorage.savedTransactions);
    }
    autorun(() => {
      localStorage.savedTransactions = JSON.stringify(toJS(this.transactions));
    });
  }

  @computed get balance() {
    return sum(this.transactions);
  }

  @computed get isNegative() {
    return this.balance < 0;
  }

  @computed get deposits() {
    return this.transactions.filter((t) => t >= 0);
  }

  @computed get withdrawls() {
    return this.transactions.filter((t) => t < 0);
  }

  @action deposit(money) {
    if (money) {
      this.transactions.push(money);
    }
  }
  @action withdraw(money) {
    if (money) {
      this.transactions.push(-money);
    }
  }
}
