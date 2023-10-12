import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { JobDetails } from 'src/models/job-search.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-liked-cell',
  template: `
  <app-liked-jobs [jobDetail]="jobDetail"></app-liked-jobs>
  `,
  styles: [
  ]
})
export class LikedCellComponent implements OnInit, ICellRendererAngularComp {

  jobDetail: JobDetails = {};
  ngOnInit(): void {
    
  }
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: any): void {
    this.jobDetail = (params.data);
  }
}
