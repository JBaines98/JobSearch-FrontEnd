import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, Inject } from '@angular/core';
import { JobSearchService } from '../job-search.service';
import { JobStorageService } from '../job-storage.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { JobDetails } from 'src/models/job-search.model';
import { LoggerService } from '../logger.service';
// import { MatSnackBar } from '@angular/material/';

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}

@Component({
  selector: 'app-job-rating',
  templateUrl: './job-rating.component.html',
  styleUrls: ['./job-rating.component.scss']

})

export class JobRatingComponent implements OnInit {

  @Input('rating') private rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  @Input() jobDetail: JobDetails ={};

  private snackBarDuration: number = 2000;
  public ratingArr: any = [];



  constructor(
    public jobSearchService: JobSearchService,
    public jobStorageService: JobStorageService,
    public loggerService: LoggerService,
    // private snackBar: MatSnackBar,
  ){}

  ngOnInit(){
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number){
    console.log(rating);
    // this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
    //   duration: this.snackBarDuration
    // });
    this.rating = rating;
    this.ratingUpdatedHandler(this.jobDetail);
    this.ratingUpdated.emit(this.rating);
    this.loggerService.logInfo(this.loggerService.RATED_SUCCESS_MESSAGE, this.jobDetail);
    return false;
  }
  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  private ratingUpdatedHandler(bob: JobDetails){
    this.jobSearchService.jobRating(bob, this.rating);
  }
}

