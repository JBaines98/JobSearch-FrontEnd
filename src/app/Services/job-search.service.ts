import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  takeUntil,
  tap,
} from 'rxjs';
import { JobDetails, JobSearch } from 'src/models/job-search.model';
import { LoggerService } from './logger.service';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../Components/comment/comment.component';

@Injectable({
  providedIn: 'root',
})
export class JobSearchService implements OnDestroy {
  public destroyed$ = new Subject();

  private jobArray: JobDetails[] = [];

  private jobSearch: JobSearch = {};

  private behaviorSearchParameters$ = new BehaviorSubject<JobSearch>({})

  public searchParameters$ = this.behaviorSearchParameters$.asObservable();

  private behaviorSearchResults$ = new BehaviorSubject<JobDetails[]>([]);

  public searchResults$ = this.behaviorSearchResults$.asObservable();

  private behaviorRatingResults$ = new BehaviorSubject<JobDetails>({});

  public ratingResults$ = this.behaviorRatingResults$.asObservable();

  private behaviourLikedResults$ = new BehaviorSubject<JobDetails>({});

  public likedResults$ = this.behaviourLikedResults$.asObservable();

  constructor(public http: HttpClient, public loggerService: LoggerService, public dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  deleteJob(jobToRemove: JobDetails) {
    this.jobArray = this.jobArray.filter((item) => item !== jobToRemove);
    this.behaviorSearchResults$.next(this.jobArray);
    this.loggerService.logInfo(this.loggerService.DELETED_SUCCESS_MESSAGE);
  }

  clearArray() {
    this.jobArray = [];
    this.behaviorSearchResults$.next(this.jobArray);
    this.loggerService.logInfo(this.loggerService.CLEAR_SUCCESS_MESSAGE);
  }
  deleteSelectedJobs(selectedJobs: JobDetails[]) {
    this.jobArray = this.jobArray.filter((el) => !selectedJobs.includes(el));
    this.behaviorSearchResults$.next(this.jobArray);
    this.loggerService.logInfo(
      this.loggerService.DELETED_SUCCESS_MESSAGE,
      selectedJobs
    );
  }
  jobRating(job: JobDetails, rating: number) {
    let foundJob = this.jobArray.find((x) => x.jobId === job.jobId);
    foundJob!.jobRating = rating;
    this.behaviorRatingResults$.next(foundJob!);
    this.behaviorSearchResults$.next(this.jobArray);
    this.loggerService.logInfo(this.loggerService.RATED_SUCCESS_MESSAGE, job);
  }
  jobLiked(job: JobDetails, liked: boolean) {
    let foundJob = this.jobArray.find((x) => x.jobId === job.jobId);
    foundJob!.jobLiked = liked;
    this.behaviourLikedResults$.next(foundJob!);
    this.behaviorSearchResults$.next(this.jobArray);
    this.loggerService.logInfo(this.loggerService.LIKED_SUCCESS_MESSAGE, job);
  }
  jobSearchBinding(jobSearch: JobSearch){
    this.jobSearch = jobSearch;
    this.behaviorSearchParameters$.next(this.jobSearch);

  }
  // jobComment(jobDetails: JobDetails, ){
  //   const dialogRef = this.dialog.open(CommentComponent,{
  //     width: 'fit-content',
  //     height: 'fit-content',
  //     data: {job: jobDetails}
  //   });
  // }
  // closeCommentDialog(){
  //   // this.dialogRef.close();
  // }

  searchJob(newInput: JobSearch): Observable<JobDetails[]> {
    let urlBuilder = 'https://localhost:7059/api/search?';
    if (newInput.jobTitle) {
      urlBuilder = urlBuilder + 'keywords=' + newInput.jobTitle;
    }
    if (newInput.locationName) {
      urlBuilder = urlBuilder + 'locationName=' + newInput.locationName;
    }
    if (newInput.distanceFromLocation) {
      urlBuilder =
        urlBuilder + 'distanceFromLocation=' + newInput.distanceFromLocation;
    }
    if (newInput.minimumSalary) {
      urlBuilder = urlBuilder + 'minimumSalary=' + newInput.minimumSalary;
    }
    // if (newInput.jobTitle) {
    //   urlBuilder = urlBuilder + 'jobTitle=' + newInput.jobTitle;
    // }
    if (newInput.employerName) {
      urlBuilder = urlBuilder + 'employerName=' + newInput.employerName;
    }
    if (newInput.date) {
      urlBuilder = urlBuilder + 'date=' + newInput.date;
    }
    if (newInput.fullTime) {
      urlBuilder = urlBuilder + 'fullTime=' + newInput.fullTime;
    }

    var returnObs = this.http
      .get<any>(urlBuilder, {
        headers: {
          Authorization:
            'Basic Nzk1YzM0OTktZDc0NS00ZGEyLTg5OTAtZGYwY2M2MjMyOTljOg==',
        },
      })
      .pipe(
        catchError((err): any => {
          this.loggerService.logError(
            this.loggerService.DATA_ERROR_MESSAGE,
            err
          );
        }),
        tap((apiReturnData) => {
          console.log(JSON.stringify(apiReturnData));
          this.jobArray = [...apiReturnData, ...this.jobArray];
          this.behaviorSearchResults$.next(this.jobArray);
          this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);

          // store api return data . results in that array(privcate job results)
        }),
        takeUntil(this.destroyed$)
      );
      returnObs.subscribe();
    return returnObs;
  }
}
