import { Component } from '@angular/core';
import { JobSearchService } from './job-search.service'
import { JobDetails, JobSearch } from 'src/models/job-search.model';
import { JobStorageService } from './job-storage.service';
import { Observable, map, tap, } from 'rxjs';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from './logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JobSearch';
  jobSearchData: JobSearch = {};
  jobResults: JobDetails[] = [];
  showMyContainer: boolean = true;
  showMySavedJobs: boolean = false;
  savedJobs: JobDetails[] = [];

  constructor(
    public jobSearchService: JobSearchService,
    public jobStorageService: JobStorageService,
    public loggerService: LoggerService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    ){
      this.loggerService.logMessage$.pipe(
        tap(message => {
          this._snackBar.open(message);
        })
      ).subscribe();
    }




  onSubmit(){

     this.jobSearchService.searchJob(this.jobSearchData);
    this.showMyContainer = false;
    this.loggerService.logInfo(this.loggerService.SUBMITTED_MESSAGE);
    }
  
  jobSearchEnteredSubmit(inputDetails: JobSearch){
    this.jobSearchData = inputDetails;
    // this.loggerService.logInfo(this.loggerService.SUBMITTED_MESSAGE);
  }
  onClear(){
    this.jobSearchService.clearArray();
    this.showMyContainer = true;
    this.loggerService.logInfo(this.loggerService.CLEAR_SUCCESS_MESSAGE);
  }
  openSavedJobs(){
    this.jobStorageService.savedResults$.pipe(
      tap((bob) => {
        this.savedJobs = bob;
      })
    ).subscribe();
    console.log(this.savedJobs);
    this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
    alert(JSON.stringify(this.savedJobs))
    
    // const dialogRef = this.dialog.open(this.savedJobs)
   }
   displayDialog(){
    this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
    const dialogRef = this.dialog.open(SavedJobsComponent,{
      width: '250px',
      data: this.savedJobs
  })
   }




}
