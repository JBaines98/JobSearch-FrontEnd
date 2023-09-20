import { NgFor } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, } from 'rxjs';
import { JobDetails, JobSearch } from 'src/models/job-search.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class JobStorageService {

  private savedArray: JobDetails[]=[];

  private jobCount: number = 0;


  private behaviorSavedResults$ = new BehaviorSubject<JobDetails[]>([]);

  public savedResults$ = this.behaviorSavedResults$.asObservable();

  constructor(public loggerService: LoggerService) {
    
    const data = localStorage.getItem("savedArray");
      if (data){
        console.log("data: ", JSON.parse(data));
        this.savedArray = JSON.parse(data);
        this.behaviorSavedResults$.next(this.savedArray);
      }
  }

  saveMyJobs(savedJobs: JobDetails[]){
    let runningJobCount = 0;
    for (const loopJob of savedJobs) {
      if (this.savedArray.includes(loopJob)) {
        this.loggerService.logInfo(this.loggerService.ALREADY_SAVED_MESSAGE, savedJobs);
        console.log('This job has already been saved.')
      }else{
        this.savedArray.push(loopJob);
        runningJobCount = runningJobCount++;
        this.loggerService.logInfo(this.loggerService.SAVED_MESSAGE, savedJobs);
        console.log(`savedJob ID: ${runningJobCount}`)
      }
    }
    this.jobCount = this.savedArray.length;
    alert(`Total number of saved jobs: ${this.jobCount}`);
    this.behaviorSavedResults$.next(this.savedArray);
    localStorage.setItem("savedArray", JSON.stringify(this.savedArray));

  }
  removeJob(jobToRemove: JobDetails){
    this.savedArray = this.savedArray.filter( job => job.jobId !== jobToRemove.jobId);
    this.behaviorSavedResults$.next(this.savedArray);
    this.loggerService.logInfo(this.loggerService.REMOVED_MESSAGE, jobToRemove);
  }

}
