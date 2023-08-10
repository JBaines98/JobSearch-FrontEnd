import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { JobDetails } from 'src/models/job-search.model';
import { MatDialogModule } from '@angular/material/dialog';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { JobSearchService } from '../job-search.service'
import { Observable, map, tap, } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  @Input() jobDetail: JobDetails = {};

  // jobRatingDisplay: number | undefined;
  // jobLikedOrDisliked: boolean | undefined;

  constructor(
    public dialogRef: MatDialogRef<JobDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobDetails,
    public jobSearchService: JobSearchService) {}

  ngOnInit(): void {
    this.jobDetail=this.data;
    // this.jobSearchService.ratingResults$.pipe(
    //   tap((bob) => {
    //     this.jobRatingDisplay = bob.jobRating;
    //   })
    // ).subscribe();
    // this.jobSearchService.likedResults$.pipe(
    //   tap((bob) => {
    //     this.jobLikedOrDisliked = bob.jobLiked
    //   })
    // ).subscribe();
  }

  showJobDescription(bob: JobDetails){
    
  }
  
}
