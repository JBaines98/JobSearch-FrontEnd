import { Component } from '@angular/core';
import { JobSearchService } from './job-search.service'
import { JobDetails, JobSearch } from 'src/models/job-search.model';
import { JobStorageService } from './job-storage.service';

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
  savedJobs: JobDetails[] = [];

  constructor(
    public jobSearchService: JobSearchService,
    public jobStorageService: JobStorageService){}

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
    this.savedJobs = this.jobStorageService.savedArray;
    console.log(this.savedJobs);
    alert(JSON.stringify(this.savedJobs))
    
    // const dialogRef = this.dialog.open(this.savedJobs)
   }
}
