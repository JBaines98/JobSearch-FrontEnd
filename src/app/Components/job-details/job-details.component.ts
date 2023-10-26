import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { JobDetails } from 'src/models/job-search.model';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JobSearchService } from '../../Services/job-search.service'
import { Observable, map, tap, } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { JobDescriptionComponent } from 'src/app/Components/job-description/job-description.component';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {

  @Input() jobDetail: JobDetails = {};



  constructor(
    public dialogRef: MatDialogRef<JobDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobDetails,
    public dialog: MatDialog,
    public jobSearchService: JobSearchService) {}

  ngOnInit(): void {
    this.jobDetail=this.data;
  }

  showJobDescription(job: JobDetails){
    const dialogRef = this.dialog.open(JobDescriptionComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: job,
    })
  }
  
}
