import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, } from 'rxjs';
import { JobDetails, JobSearch } from 'src/models/job-search.model';

@Injectable({
  providedIn: 'root'
})
export class JobStorageService {

  public savedArray: JobDetails[]=[];

  constructor() {}

  saveMyJobs(savedJobs: JobDetails[]){
    this.savedArray = this.savedArray.concat(savedJobs);
    console.log(this.savedArray);
    alert('Jobs have been saved.');
  }

}
