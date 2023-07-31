import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap, } from 'rxjs';
import { JobDetails, JobSearch } from 'src/models/job-search.model';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  private jobArray: JobDetails[]=[];

  private behaviorSearchResults$ = new BehaviorSubject<JobDetails[]>([]);

  public searchResults$ = this.behaviorSearchResults$.asObservable();


  constructor(public http: HttpClient) { }

  deleteJob(jobToRemove: JobDetails){
    this.jobArray = this.jobArray.filter(item => item !== jobToRemove);
    this.behaviorSearchResults$.next(this.jobArray);
  }

  clearArray(){
    this.jobArray = [];
    this.behaviorSearchResults$.next(this.jobArray);
  }
  deleteSelectedJobs(selectedJobs: JobDetails[]){

    this.jobArray = this.jobArray.filter((el) => !selectedJobs.includes(el));
    this.behaviorSearchResults$.next(this.jobArray);
  }

  searchJob(newInput: JobSearch) {
    let urlBuilder = "http://localhost:3300/api/search?";
    if (newInput.jobTitle) {
      urlBuilder = urlBuilder + 'keywords=' + newInput.jobTitle; 
    }
    if (newInput.locationName) {
      urlBuilder = urlBuilder + 'locationName=' + newInput.locationName; 
    }
    if (newInput.distanceFromLocation) {
      urlBuilder = urlBuilder + 'distanceFromLocation=' + newInput.distanceFromLocation; 
    }
    if (newInput.minimumSalary) {
      urlBuilder = urlBuilder + 'minimumSalary=' + newInput.minimumSalary; 
    }
    // if (newInput.jobTitle) {
    //   urlBuilder = urlBuilder + 'jobTitle=' + newInput.jobTitle; 
    // }
    if (newInput.employerName) {
      urlBuilder = urlBuilder + 'employerName=' + newInput.employerName; 
    }
    if (newInput.date) {
      urlBuilder = urlBuilder + 'date=' + newInput.date; 
    }
    if (newInput.fullTime) {
      urlBuilder = urlBuilder + 'fullTime=' + newInput.fullTime; 
    }

    this.http
      .get<any>(
        urlBuilder
        ,{
          
          headers: {
            'Authorization':
            'Basic Nzk1YzM0OTktZDc0NS00ZGEyLTg5OTAtZGYwY2M2MjMyOTljOg=='
          }
          
        }
      
        )
      .pipe(
        tap((apiReturnData) => {
          console.log(JSON.stringify(apiReturnData.results));
          this.jobArray= [...apiReturnData.results, ...this.jobArray];
          this.behaviorSearchResults$.next(this.jobArray);
          // store api return data . results in that array(privcate job results)
                })
      ).subscribe();
  }
}
