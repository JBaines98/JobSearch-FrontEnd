import { Component, Inject, Input } from '@angular/core';
import { JobStorageService } from '../../Services/job-storage.service';
import { JobSearchService } from '../../Services/job-search.service';
import { JobDetails } from 'src/models/job-search.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  // public job1: {job: JobDetails} = {job: {}};

  public jobComment : string = '';



  constructor(
    public jobSearchService: JobSearchService, 
    public jobStorageService: JobStorageService,
    @Inject(MAT_DIALOG_DATA) public data: {jobDetail: JobDetails}
    ){}


    ngOnInit(){
      // this.job1.job.jobComment = this.jobComment;
    }

  saveComment(jobDetail: JobDetails){
    this.jobStorageService.saveMyComment(jobDetail)


  }

  // cancelDialog(){
  //   this.jobSearchService.closeCommentDialog();
  // }

}



