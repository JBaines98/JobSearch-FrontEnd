import { Component } from '@angular/core';
import { JobSearchService } from './job-search.service'
import { JobDetails, JobSearch } from 'src/models/job-search.model';

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

  constructor(public jobSearchService: JobSearchService){}

  onSubmit(){

 this.jobSearchService.searchJob(this.jobSearchData).subscribe(jobs => {
      console.log(JSON.stringify(jobs));
      this.jobResults = jobs;
      this.showMyContainer = false;
    })

    }
  
  jobSearchEnteredSubmit(inputDetails: JobSearch){
    this.jobSearchData = inputDetails;
  }
}
