import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobSearchService } from '../job-search.service';
import { JobDetails } from 'src/models/job-search.model';
import { Observable, map, tap, } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-number-of-jobs',
  templateUrl: './number-of-jobs.component.html',
  styleUrls: ['./number-of-jobs.component.css']
})
export class NumberOfJobsComponent implements OnDestroy{

 public jobCount: number=0;
 public destroyed$ = new Subject();

  constructor(public jobSearchService: JobSearchService){
  }
  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  ngOnInit(){
    this.jobSearchService.searchResults$.pipe(
      tap((bob) => {
        this.jobCount = bob.length;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();

  }


}
