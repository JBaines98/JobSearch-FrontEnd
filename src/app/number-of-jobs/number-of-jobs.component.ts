import { Component, OnInit } from '@angular/core';
import { JobSearchService } from '../job-search.service';
import { JobDetails } from 'src/models/job-search.model';
import { Observable, map, tap, } from 'rxjs';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-number-of-jobs',
  templateUrl: './number-of-jobs.component.html',
  styleUrls: ['./number-of-jobs.component.css']
})
export class NumberOfJobsComponent {

 public jobCount: number=0;

  constructor(public jobSearchService: JobSearchService){
  }

  ngOnInit(){
    this.jobSearchService.searchResults$.pipe(
      tap((bob) => {
        this.jobCount = bob.length;
            })
    ).subscribe();

  }


}
