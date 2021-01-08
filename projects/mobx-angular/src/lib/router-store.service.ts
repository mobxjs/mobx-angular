import { Injectable } from '@angular/core';
import { action, observable } from 'mobx';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterStore {
  @observable url = '';

  constructor(private router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.routeListener(e));
  }

  @action private routeListener(event: NavigationEnd) {
    this.url = event.urlAfterRedirects;
  }
  @action navigate(url: string, extras?: NavigationExtras) {
    return this.router.navigate([url], extras);
  }
}
