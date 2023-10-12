import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { LoggerService } from '../../Services/logger.service';

@Component({
  selector: 'app-delete-my-cell',
  template: `
      <button mat-button color="primary" (click)="deleteClickedHandler($event)">Delete Job X</button>
  `,
  styles: [
  ]
})
export class DeleteMyCellComponent implements OnInit, ICellRendererAngularComp{

  constructor(public loggerService: LoggerService){}

  private parms: any;

  ngOnInit(): void {
    
  }
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: any): void {
    this.parms = params;
  }
  deleteClickedHandler(event: any){
    this.parms.clicked(this.parms.data);
    this.loggerService.logInfo(this.loggerService.DELETED_SUCCESS_MESSAGE);
  }
}
