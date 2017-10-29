import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align:center">
      <h1>
        Welcome to your bank account manager!
      </h1>
      <app-balance></app-balance>
      <app-actions></app-actions>
      <app-transactions></app-transactions>
    </div>
  `
})
export class AppComponent {
}
