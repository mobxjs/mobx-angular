import { Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterStore {
  url = '';

  constructor(private router: Router) {
    makeAutoObservable(this);

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.routeListener(e));
  }

  private routeListener(event: NavigationEnd) {
    this.url = event.urlAfterRedirects;
  }
}
