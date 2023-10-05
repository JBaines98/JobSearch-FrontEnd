import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { JobStorageService } from '../job-storage.service';
import { JobDetails } from 'src/models/job-search.model';
import { Observable, Subject, map, tap } from 'rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss'],
})
export class SavedJobsComponent implements OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { usageType: string },
    public jobStorageService: JobStorageService
  ) {}

  savedJobs: JobDetails[] = [];
  public destroyed$ = new Subject();

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.jobStorageService.savedResults$
      .pipe(
        tap((bob) => {
          this.savedJobs = bob;
        })
      )
      .subscribe();

    this.jobStorageService.getSavedJobs();
  }
}
