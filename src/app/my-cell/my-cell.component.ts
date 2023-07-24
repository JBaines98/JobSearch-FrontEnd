import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';



@Component({
  selector: 'app-my-cell',
  template: `
    <button mat-button color="primary" (click)="btnClickedHandler($event)">Click for details</button>
  `,
  styles: [
  ]
})
export class MyCellComponent implements OnInit, ICellRendererAngularComp{
  
  private parms: any;

  ngOnInit(): void {
    
  }
  refresh(params: any): boolean {
    return false;
  }

  agInit(params: any): void {
    this.parms = params;
  }
  btnClickedHandler(event: any){
    this.parms.clicked(this.parms.data);
  }
}
