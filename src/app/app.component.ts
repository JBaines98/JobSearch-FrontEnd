import { Component, OnDestroy } from '@angular/core';
import { JobSearchService } from './job-search.service';
import { JobDetails, JobSearch } from 'src/models/job-search.model';
import { JobStorageService } from './job-storage.service';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from './logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';
import { UserService } from './user.service';
import { UserInterfaceService } from './user-interface.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'JobSearch';
  jobSearchData: JobSearch = {};
  jobResults: JobDetails[] = [];
  showMySavedJobs: boolean = false;
  showMySavedSearches: boolean = false;
  savedJobs: JobDetails[] = [];
  showAgGrid: boolean = false;
  formPanelOpenState: boolean = true;

  destroyed$ = new Subject();

  themeName: string = '';

  constructor(
    public jobSearchService: JobSearchService,
    public jobStorageService: JobStorageService,
    public loggerService: LoggerService,
    public userService: UserService,
    public userInterfaceService: UserInterfaceService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar
  ) {
    this.loggerService.logMessage$
      .pipe(
        tap((message) => {
          this._snackBar.open(message);
        })
      )
      .subscribe();

    this.userInterfaceService.themeNameSelected$
      .pipe(
        tap((theme) => {
          this.themeName = theme;
        })
      )
      .subscribe();

    if (this.formPanelOpenState) {
      this.showAgGrid = false;
    } else {
      this.showAgGrid = true;
    }

    this.jobStorageService.getSavedJobs();
    this.jobStorageService.getSavedSearches();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  onSubmit() {
    this.jobSearchService
      .searchJob(this.jobSearchData)
      .pipe(
        tap((jobs) => {
          this.jobResults = jobs;
        })
      )
      .subscribe();
    // this.showMyContainer = false;
    this.showAgGrid = true;
    this.formPanelOpenState = false;
    this.loggerService.logInfo(this.loggerService.SUBMITTED_MESSAGE);
  }

  homeClicked() {
    // this.showMyContainer = true;
    this.showMySavedJobs = false;
    this.userInterfaceService.themeChange('light');
  }

  jobSearchEnteredSubmit(inputDetails: JobSearch) {
    this.jobSearchData = inputDetails;
    // this.loggerService.logInfo(this.loggerService.SUBMITTED_MESSAGE);
  }
  onClear() {
    this.jobSearchService.clearArray();
    // this.showMyContainer = true;
    this.loggerService.logInfo(this.loggerService.CLEAR_SUCCESS_MESSAGE);
  }
  openSavedJobs() {
    this.jobStorageService.savedResults$
      .pipe(
        tap((bob) => {
          this.savedJobs = bob;
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
    console.log(this.savedJobs);
    this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
    alert(JSON.stringify(this.savedJobs));

    // const dialogRef = this.dialog.open(this.savedJobs)
  }
  displayDialog() {
    

    this.jobStorageService.savedResults$
    .pipe(
      tap((savedJobs) => {
        this.showAgGrid = true;
        this.jobResults = savedJobs;
      })
    )
    .subscribe();

  this.jobStorageService.getSavedJobs();

    // this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
    // const dialogRef = this.dialog.open(SavedJobsComponent, {
    //   panelClass: 'jobList',
    //   width: '250px',
    //   data: { usageType: 'popUp' },
    // });
  }

  displayJobSearches() {
    this.loggerService.logInfo(this.loggerService.SUCCESS_MESSAGE);
    this.jobStorageService.getSavedSearches();
    const dialogRef = this.dialog.open(SavedSearchesComponent, {
      width: '250px',
      data: this.jobStorageService.savedSearchResults$,
    });
  }

  onSaveSearch(jobSearchData: JobSearch) {
    this.jobStorageService.saveMySearch(jobSearchData);
  }

  changeTheme(theme: string) {
    this.userInterfaceService.themeChange(theme);
  }
}
