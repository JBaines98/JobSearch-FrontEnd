import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobStorageService } from '../job-storage.service';
import { JobDetails } from 'src/models/job-search.model';
import { Observable, Subject, map, tap, } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnDestroy{

  constructor(public jobStorageService: JobStorageService){}

  savedJobs: JobDetails[]=[];
  public destroyed$ = new Subject();


  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

 
  ngOnInit(){
    this.jobStorageService.savedResults$.pipe(
      tap((bob) => {
        this.savedJobs = bob;
      })
    ).subscribe();
    
    this.jobStorageService.getSavedJobs();
  }




} 