import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ttt-cell',
  template: `
    <span class="cell-content" (click)="select.emit()">
      <span *ngIf="value">{{ value }}</span>
      <span class="next-value" *ngIf="!value">{{ nextValue }}</span>
    </span>
  `,
  styles: [
    `.next-value {opacity: 0}`,
    `.cell-content:hover .next-value {opacity: 0.3}`
  ]
})
export class CellComponent implements OnInit {
  @Input() value:string;
  @Input() nextValue:string;
  @Output() select:EventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
