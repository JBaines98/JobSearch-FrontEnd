import { Component, OnDestroy } from '@angular/core';
import { JobStorageService } from '../job-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobSearch } from 'src/models/job-search.model';
import { Observable, Subject, map, takeUntil, tap, } from 'rxjs';

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.scss']
})
export class SavedSearchesComponent implements OnDestroy {


  constructor(public jobStorageService: JobStorageService, public dialog: MatDialog){}

  public destroyed$ = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  savedSearches: JobSearch[]=[];

  ngOnInit(){
    this.jobStorageService.savedSearchResults$.pipe(
      tap((results) => {
        this.savedSearches = results;

      }),
      takeUntil(this.destroyed$)
    ).subscribe();

    this.jobStorageService.getSavedSearches();
  }
}
