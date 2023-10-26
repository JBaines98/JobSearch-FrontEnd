import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { JobStorageService } from '../../Services/job-storage.service';
import { JobDetails } from 'src/models/job-search.model';
import { Observable, Subject, map, tap } from 'rxjs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss'],
})
export class SavedJobsComponent implements OnDestroy {

@Output() closingEvent = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { usageType: string },
    public jobStorageService: JobStorageService,
    public dialog: MatDialog,
  ) {}

  savedJobs: JobDetails[] = [];
  public destroyed$ = new Subject();
  public doNotShow: boolean = false;
  public confirmationDialogResult: boolean = false;

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

  openDetails(job: JobDetails) {
    const dialogRef = this.dialog.open(JobDetailsComponent, {
      data: job,
      width: 'fit-content'
    });
  }

  closing(value: boolean){
    this.closingEvent.emit(value);
  }

  confirmationDialog(job: JobDetails){
      const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: 'fit-content',
      height: 'fit-content',
      data: {job: job, message: 'Are you sure you want to delete?'},
    })
    dialogRef.afterClosed().subscribe(result => {
      this.confirmationDialogResult = result;
      console.log(this.confirmationDialogResult);
      if (this.confirmationDialogResult === true){
        this.jobStorageService.removeJob(job);
      }else{
        console.log("Job NOT deleted.")
      }
    })  
  }
}
