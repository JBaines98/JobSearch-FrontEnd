import { Component, Input, OnInit } from '@angular/core';
import { JobSearchService } from '../job-search.service';
import { JobStorageService } from '../job-storage.service';
import { JobDetails } from 'src/models/job-search.model';
import { Observable, map, tap, } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-liked-jobs',
  templateUrl: './liked-jobs.component.html',
  styleUrls: ['./liked-jobs.component.css']
})
export class LikedJobsComponent implements OnInit {

  @Input() jobDetail: JobDetails = {};

  public jobLiked?: boolean = undefined;
  public jobLikedOrDisliked?: boolean = undefined;

  constructor(
    public jobSearchService: JobSearchService,
    public jobStorageServide: JobStorageService,
  ){}
 

  ngOnInit(){
    this.jobSearchService.likedResults$.pipe(
      tap((bob) => {
        this.jobLiked = bob.jobLiked;
      })
    ).subscribe();
  }

  showThumbs(thumbsup: boolean){
    this.jobLikedOrDisliked = thumbsup;

    this.jobSearchService.jobLiked(this.jobDetail, thumbsup)
  }

}
