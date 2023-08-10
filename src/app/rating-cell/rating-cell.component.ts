import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { JobDetails } from 'src/models/job-search.model';


@Component({
  selector: 'app-rating-cell',
  template: `
<app-job-rating [jobDetail]="jobDetail"></app-job-rating>
  `,
  styles: [
  ]
})
export class RatingCellComponent implements OnInit, ICellRendererAngularComp {

  jobRating = 0;

  jobDetail: JobDetails = {};


  ngOnInit(): void {

  }
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: any): void {
    this.jobRating = (params.data.jobRating);
    this.jobDetail = (params.data);
  }

}
