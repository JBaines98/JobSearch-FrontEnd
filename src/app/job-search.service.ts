import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { JobDetails, JobSearch } from 'src/models/job-search.model';

@Injectable({
  providedIn: 'root'
})
export class JobSearchService {

  public searchResults: JobDetails[] = [];


  constructor(public http: HttpClient) { }

  searchJob(newInput: JobSearch): Observable<JobDetails[]> {
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

    return this.http
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
        map((apiReturnData) => {
          return apiReturnData.results;
        })
      )
  }
}
