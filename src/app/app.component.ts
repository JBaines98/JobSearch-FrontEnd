import { Component } from '@angular/core';
import { JobSearchService } from './job-search.service'
import { JobDetails, JobSearch } from 'src/models/job-search.model';
import { JobStorageService } from './job-storage.service';
import { Observable, map, tap, } from 'rxjs';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { MatDialog } from '@angular/material/dialog';

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
    public dialog: MatDialog,
    ){}

  onSubmit(){

     this.jobSearchService.searchJob(this.jobSearchData);
    this.showMyContainer = false;
    }
  
  jobSearchEnteredSubmit(inputDetails: JobSearch){
    this.jobSearchData = inputDetails;
  }
  onClear(){
    this.jobSearchService.clearArray();
    this.showMyContainer = true;
  }
  openSavedJobs(){
    this.jobStorageService.savedResults$.pipe(
      tap((bob) => {
        this.savedJobs = bob;
      })
    ).subscribe();
    console.log(this.savedJobs);
    alert(JSON.stringify(this.savedJobs))
    
    // const dialogRef = this.dialog.open(this.savedJobs)
   }
   displayDialog(){
    const dialogRef = this.dialog.open(SavedJobsComponent,{
      width: '250px',
      data: this.savedJobs
  })
   }




}
