import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div class="content">
        <app-balance></app-balance>
        <app-actions></app-actions>
        <app-transactions></app-transactions>
      </div>
    </div>
  `,
  styles: [
    `.content {
      padding-left: 20px;
    }`
  ]
})
export class AppComponent {
}
