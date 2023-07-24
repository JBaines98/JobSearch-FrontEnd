import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { JobDetails } from 'src/models/job-search.model';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  @Input() jobDetail: JobDetails = {};

  constructor(
    public dialogRef: MatDialogRef<JobDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobDetails) {}

  ngOnInit(): void {
    this.jobDetail=this.data;
  }
  
}
