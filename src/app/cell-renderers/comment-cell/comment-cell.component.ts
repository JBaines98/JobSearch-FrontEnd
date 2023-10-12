import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-comment-cell',
  template: `
    <p>
      <button mat-raised-button color="primary" (click)="btnClickedHandler($event)">
        Comment <i class="fa-solid fa-comment"></i>
      </button>
    </p>
  `,
  styles: [
  ]
})
export class CommentCellComponent implements OnInit, ICellRendererAngularComp {


  private params: any;

  ngOnInit(): void{}

  refresh(): boolean {
    return false;
  }
  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(event: any){
    this.params.clicked(this.params.data);
  }

}
