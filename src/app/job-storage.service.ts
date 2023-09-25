import { NgFor } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, } from 'rxjs';
import { JobDetails, JobSearch } from 'src/models/job-search.model';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class JobStorageService {

  private savedArray: JobDetails[]=[];

  private savedSearches: JobSearch[]=[];

  private jobCount: number = 0;

  public searchCount: number = 0;


  private behaviorSavedResults$ = new BehaviorSubject<JobDetails[]>([]);

  public savedResults$ = this.behaviorSavedResults$.asObservable();

  private behaviorSearchResults$ = new BehaviorSubject<JobSearch[]>([]);

  public savedSearchResults$ = this.behaviorSearchResults$.asObservable();

  constructor(public loggerService: LoggerService, public http: HttpClient, public userService: UserService) {
    
    // const data = localStorage.getItem("savedArray");
    //   if (data){
    //     console.log("data: ", JSON.parse(data));
    //     this.savedArray = JSON.parse(data);
    //     this.behaviorSavedResults$.next(this.savedArray);
    //   }
  }

  // saveMyJobs(savedJobs: JobDetails[]){
  //   let runningJobCount = 0;
  //   for (const loopJob of savedJobs) {
  //     if (this.savedArray.includes(loopJob)) {
  //       this.loggerService.logInfo(this.loggerService.ALREADY_SAVED_MESSAGE, savedJobs);
  //       console.log('This job has already been saved.')
  //     }else{
  //       this.savedArray.push(loopJob);
  //       runningJobCount = runningJobCount++;
  //       this.loggerService.logInfo(this.loggerService.SAVED_MESSAGE, savedJobs);
  //       console.log(`savedJob ID: ${runningJobCount}`)
  //     }
  //   }
  //   this.jobCount = this.savedArray.length;
  //   alert(`Total number of saved jobs: ${this.jobCount}`);
  //   this.behaviorSavedResults$.next(this.savedArray);
  //   localStorage.setItem("savedArray", JSON.stringify(this.savedArray));
  // }

  saveMyJobs(savedJobs: JobDetails[]): Observable<any>
  {
    this.jobCount = this.jobCount + savedJobs.length;
    var userName1 = this.userService.user.userName;
    return this.http.post<any>("https://localhost:7059/api/JobStorage/saveMyJobs?userName=" + userName1,
    {
      headers: {
        'Authorization':
        'Basic Nzk1YzM0OTktZDc0NS00ZGEyLTg5OTAtZGYwY2M2MjMyOTljOg=='
      }
    }
    ).pipe(
      catchError((err: any): any=>{
        this.loggerService.logError(this.loggerService.ERROR_MESSAGE, err)
      }),
      tap()
    );
    // return isTrue = true;
    
  }

  getSavedSearches(){
    var userName = this.userService.user.userName
    this.http.get<any>("https://localhost:7059/api/JobStorage/getSavedSearch?userName=" + userName,
    {
      headers: {
        'Authorization':
        'Basic Nzk1YzM0OTktZDc0NS00ZGEyLTg5OTAtZGYwY2M2MjMyOTljOg=='
      }
    }
    ).pipe(
      catchError((err: any): any=>{
        this.loggerService.logError(this.loggerService.DATA_ERROR_MESSAGE, err)
      }),
      tap((savedSearchesDB: JobSearch[]) => {
        console.log(JSON.stringify(savedSearchesDB));
        console.log("TEST SUCCESS!!!!!!!");
        this.savedSearches = savedSearchesDB;
        this.behaviorSearchResults$.next(this.savedSearches);
        this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
        this.searchCount = savedSearchesDB.length;
      })
    ).subscribe();
  }









  getSavedJobs(){
    var userName1 = this.userService.user.userName;
    this.http.get<any>("https://localhost:7059/api/JobStorage/getSavedJobs?userName=" + userName1,
    {
      headers: {
        'Authorization':
        'Basic Nzk1YzM0OTktZDc0NS00ZGEyLTg5OTAtZGYwY2M2MjMyOTljOg=='
      }
    }
    ).pipe(
      catchError((err: any): any=>{
        this.loggerService.logError(this.loggerService.DATA_ERROR_MESSAGE, err)
      }),
      tap((savedJobsDB: JobDetails[]) => {
        console.log(JSON.stringify(savedJobsDB));
        console.log("TEST SUCCESS!!!!!!");
        this.savedArray = savedJobsDB;
        this.behaviorSavedResults$.next(this.savedArray);
        this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
        this.jobCount = this.savedArray.length;
        
      })
    ).subscribe();
  }

  // addMyJobs(selectedJobs: JobDetails[]){
  //   return this.http.post<any>("https://localhost:7059/api")
  // }


  removeJob(jobToRemove: JobDetails){
    this.savedArray = this.savedArray.filter( job => job.jobId !== jobToRemove.jobId);
    this.behaviorSavedResults$.next(this.savedArray);
    this.loggerService.logInfo(this.loggerService.REMOVED_MESSAGE, jobToRemove);
  }

  saveMySearch(jobSearchData: JobSearch){
    if(!jobSearchData.userDetails)
    {
      jobSearchData.userDetails = {};
    }
    jobSearchData.userDetails.userName = this.userService.user.userName;
    // this.http.post<JobSearch>("https://localhost:7059/api/JobStorage/saveMySearch?userName=" + userName1,
    this.http.post<JobSearch>("https://localhost:7059/api/JobStorage/saveMySearch", jobSearchData,
    {
      headers: {
        'Authorization':
        'Basic Nzk1YzM0OTktZDc0NS00ZGEyLTg5OTAtZGYwY2M2MjMyOTljOg=='
      }
    }
    ).pipe(
      catchError((err: any): any=>{
        this.loggerService.logError(this.loggerService.ERROR_MESSAGE, err)
      }),
      tap()
    );
  } 

//  removeSearch(JobSearch: JobSearch){
//  }



}
