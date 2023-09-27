import { Component, OnDestroy } from '@angular/core';
import { JobStorageService } from '../job-storage.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-number-of-searches-saved',
  templateUrl: './number-of-searches-saved.component.html',
  styleUrls: ['./number-of-searches-saved.component.css']
})
export class NumberOfSearchesSavedComponent implements OnDestroy {

  public searchCount: any = 0;
  public destroyed$ = new Subject();

  constructor(public jobStorageService: JobStorageService){}


  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }


  ngOnInit(){
    this.searchCount = this.jobStorageService.savedSearchResults$.pipe(
      tap((results) => {
        this.searchCount = results.length;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }


}
