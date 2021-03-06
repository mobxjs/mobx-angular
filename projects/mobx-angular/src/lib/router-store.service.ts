import { Injectable } from '@angular/core';
import { makeAutoObservable } from 'mobx';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RouterStore {
  url = '';
  routeSnapshot: ActivatedRouteSnapshot = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    makeAutoObservable(this);

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => this.routeListener(e));
  }

  private routeListener(event: NavigationEnd) {
    this.routeSnapshot = this.activatedRoute.snapshot;
    this.url = event.urlAfterRedirects;
  }
}
