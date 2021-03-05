import { Injectable } from '@angular/core';
import { observable, autorun, computed, action } from 'mobx';
import { sum } from 'lodash';

@Injectable({ providedIn: 'root' })
export class Account {
  @observable transactions: number[] = [];

  constructor() {
    if (localStorage.savedTransactions) {
      this.transactions = JSON.parse(localStorage.savedTransactions);
    }
    autorun(() => {
      localStorage.savedTransactions = JSON.stringify(this.transactions);
    });
  }

  @computed get balance(): number {
    return sum(this.transactions);
  }

  @computed get isNegative(): boolean {
    return this.balance < 0;
  }

  @computed get deposits(): number[] {
    return this.transactions.filter((t) => t >= 0);
  }

  @computed get withdrawls(): number[] {
    return this.transactions.filter((t) => t < 0);
  }

  @action deposit(money: number) {
    if (money) {
      this.transactions = [...this.transactions, money];
    }
  }
  @action withdraw(money: number) {
    if (money) {
      this.transactions = [...this.transactions, -money];
    }
  }
}
