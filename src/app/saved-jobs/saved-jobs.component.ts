import { Component, OnInit } from '@angular/core';
import { JobStorageService } from '../job-storage.service';
import { JobDetails } from 'src/models/job-search.model';
import { Observable, map, tap, } from 'rxjs';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent {

  constructor(public jobStorageService: JobStorageService){}

  savedJobs: JobDetails[]=[]

  ngOnInit(){
    this.jobStorageService.savedResults$.pipe(
      tap((bob) => {
        this.savedJobs = bob;
      })
    ).subscribe();
  }


}