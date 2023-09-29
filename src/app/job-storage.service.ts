import { NgFor } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, takeUntil, tap, } from 'rxjs';
import { JobDetails, JobSearch, UserDetails } from 'src/models/job-search.model';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class JobStorageService implements OnDestroy {

  private savedArray: JobDetails[]=[];

  private savedSearches: JobSearch[]=[];

  private jobCount: number = 0;

  public searchCount: number = 0;

  public destroyed$ = new Subject();

  public selectedUserName: UserDetails = {};



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
  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
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

  saveMyJobs(savedJobs: JobDetails[])
  {
    this.jobCount = this.jobCount + savedJobs.length;
    this.selectedUserName = this.userService.selectedUser;
    this.http.post<any>("https://localhost:7059/api/JobStorage/saveMyJobs?userName=" + this.selectedUserName, savedJobs,
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
      tap(),
      takeUntil(this.destroyed$),
      
    ).subscribe();

    alert("SAVE JOBS WORKS")
    // return isTrue = true;
    
  }

  getSavedSearches(){
    this.selectedUserName = this.userService.selectedUser;
    this.http.get<any>("https://localhost:7059/api/JobStorage/getSavedSearch?userName=" + this.selectedUserName,
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
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }



  getSavedJobs(){
    this.selectedUserName = this.userService.selectedUser;
    this.http.get<any>("https://localhost:7059/api/JobStorage/getSavedJobs?userName=" + this.selectedUserName,
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
        
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  // addMyJobs(selectedJobs: JobDetails[]){
  //   return this.http.post<any>("https://localhost:7059/api")
  // }


  removeJob(jobToRemove: JobDetails){
    
    this.selectedUserName = this.userService.selectedUser;
    this.http.delete<any>("https://localhost:7059/api/JobStorage/deleteSavedJob?JobDetailId=" + jobToRemove.jobDetailId, 
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
      tap(),
      takeUntil(this.destroyed$)
    ).subscribe();
    this.savedArray = this.savedArray.filter( job => job.jobDetailId !== jobToRemove.jobDetailId);
    this.behaviorSavedResults$.next(this.savedArray);
    this.loggerService.logInfo(this.loggerService.REMOVED_MESSAGE, jobToRemove);
  }

  removeSearch(searchToRemove: JobSearch){
    this.selectedUserName = this.userService.selectedUser;
    this.http.delete<any>("https://localhost:7059/api/JobStorage/deleteSavedSearch?JobSearchId=" + searchToRemove.jobSearchId,
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
      tap(),
      takeUntil(this.destroyed$)
    ).subscribe();
    this.savedSearches = this.savedSearches.filter(search => search.jobSearchId !== searchToRemove.jobSearchId);
    this.behaviorSearchResults$.next(this.savedSearches);
    this.loggerService.logInfo(this.loggerService.REMOVED_MESSAGE, searchToRemove);
  }




  saveMySearch(jobSearchData: JobSearch){
    if(!jobSearchData.userDetails)
    {
      jobSearchData.userDetails = {};
    }
    jobSearchData.userDetails.userName = this.userService.selectedUser.userName;
    // this.http.post<JobSearch>("https://localhost:7059/api/JobStorage/saveMySearch?userName=" + userName1,
    this.http.post<JobSearch>("https://localhost:7059/api/JobStorage/saveMySearch?userName=" + jobSearchData.userDetails.userName, jobSearchData,
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
      tap(),
      takeUntil(this.destroyed$)
    ).subscribe();
  } 

//  removeSearch(JobSearch: JobSearch){
//  }



}
