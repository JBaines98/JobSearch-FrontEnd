import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, takeUntil, tap, } from 'rxjs';
import { JobDetails, JobSearch, UserDetails } from 'src/models/job-search.model';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../Components/confirmation/confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class JobStorageService implements OnDestroy {

  private savedArray: JobDetails[]=[];

  private savedSearches: JobSearch[]=[];

  private jobCount: number = 0;

  public searchCount: number = 0;

  public destroyed$ = new Subject();

  public selectedUserId?: number = 0;



  private behaviorSavedResults$ = new BehaviorSubject<JobDetails[]>([]);

  public savedResults$ = this.behaviorSavedResults$.asObservable();

  private behaviorSearchResults$ = new BehaviorSubject<JobSearch[]>([]);

  public savedSearchResults$ = this.behaviorSearchResults$.asObservable();

  constructor(public loggerService: LoggerService, public http: HttpClient, public userService: UserService, public dialog: MatDialog) {

    this.userService.savedUser$.pipe(
      tap((user: any) => {
        this.selectedUserId = user.userId;
        this.getSavedJobs();
        this.getSavedSearches();
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
    

  }
  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }



  saveMyJobs(savedJobs: JobDetails[])
  {
    savedJobs.forEach(job =>{
      if(!job || !job.userDetails)
      {
        this.loggerService.logInfo(this.loggerService.ERROR_MESSAGE)
      }else{
        job.userDetails.userId = this.selectedUserId;
        job.userId = this.selectedUserId;
      }
    })
    this.jobCount = this.jobCount + savedJobs.length;
    this.http.post<any>("https://jobsearchapi-jbaines.azurewebsites.net/api/JobStorage/saveMyJobs", savedJobs,
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
    
  }

  getSavedSearches(){
    this.http.get<any>("https://jobsearchapi-jbaines.azurewebsites.net/api/JobStorage/getSavedSearch?userId=" + this.selectedUserId,
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
        this.savedSearches = savedSearchesDB;
        this.behaviorSearchResults$.next(this.savedSearches);
        this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
        this.searchCount = savedSearchesDB.length;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }


 
  getSavedJobs(){
    this.http.get<any>("https://jobsearchapi-jbaines.azurewebsites.net/api/JobStorage/getSavedJobs?userId=" + this.selectedUserId,
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
        this.savedArray = savedJobsDB;
        this.behaviorSavedResults$.next(this.savedArray);
        this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
        this.jobCount = this.savedArray.length;
        
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }




  removeJob(jobToRemove: JobDetails){ 
    this.http.delete<any>("https://jobsearchapi-jbaines.azurewebsites.net/api/JobStorage/deleteSavedJob?JobDetailId=" + jobToRemove.jobDetailId, 
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
    this.http.delete<any>("https://jobsearchapi-jbaines.azurewebsites.net/api/JobStorage/deleteSavedSearch?JobSearchId=" + searchToRemove.jobSearchId,
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
    if(!jobSearchData.searchName)
    {
      this.loggerService.logError(this.loggerService.ERROR_MESSAGE, 'Error: Missing search name.')
      jobSearchData.userDetails = {};
    }else{
    jobSearchData.userId = this.selectedUserId;
    this.http.post<JobSearch>("https://jobsearchapi-jbaines.azurewebsites.net/api/JobStorage/saveMySearch", jobSearchData,
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
  } 


  saveMyComment(jobDetails: JobDetails){
    if(!jobDetails || !jobDetails.userDetails)
    {
        this.loggerService.logInfo(this.loggerService.ERROR_MESSAGE)
    }else{
      jobDetails.userDetails.userId = this.selectedUserId;
      jobDetails.userId = this.selectedUserId;
      this.http.post<JobDetails>("https://jobsearchapi-jbaines.azurewebsites.net/api/JobStorage/saveMyComment",  jobDetails,
      {
        headers: {
          'Authorization':
          'Basic Nzk1YzM0OTktZDc0NS00ZGEyLTg5OTAtZGYwY2M2MjMyOTljOg=='
        }
      }
      ).pipe(
        catchError((err: any): any => {
          this.loggerService.logError(this.loggerService.ERROR_MESSAGE, err)
        }),
        tap(),
        takeUntil(this.destroyed$)
      ).subscribe();
      this.loggerService.logInfo(this.loggerService.SAVED_MESSAGE);
    }
  }





}
