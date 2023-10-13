import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { JobStorageService } from '../../Services/job-storage.service';
import { JobSearchService } from '../../Services/job-search.service';
import { JobDetails } from 'src/models/job-search.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggerService } from 'src/app/Services/logger.service';
import { UserInterfaceService } from 'src/app/Services/user-interface.service';
import { Observable, Subject, map, takeUntil, tap, } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnDestroy {

  // public job1: {job: JobDetails} = {job: {}};

  public jobComment : string = '';

  public themeName: string = '';

  public destroyed$ = new Subject();




  constructor(
    public jobSearchService: JobSearchService, 
    public jobStorageService: JobStorageService,
    public userInterfaceService: UserInterfaceService,
    public loggerService: LoggerService,
    @Inject(MAT_DIALOG_DATA) public data: {jobDetail: JobDetails}
    ){}


  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

    ngOnInit(){
      this.userInterfaceService.themeNameSelected$.pipe(
        tap((theme) => {
          this.themeName = theme;
        }),
        takeUntil(this.destroyed$)
      ).subscribe();
    }

  saveComment(jobDetail: JobDetails){
    this.jobStorageService.saveMyComment(jobDetail)
  }



  // cancelDialog(){
  //   this.jobSearchService.closeCommentDialog();
  // }

}



