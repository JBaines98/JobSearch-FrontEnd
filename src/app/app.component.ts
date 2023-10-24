import { Component, OnDestroy } from '@angular/core';
import { JobSearchService } from './Services/job-search.service';
import { JobDetails, JobSearch } from 'src/models/job-search.model';
import { JobStorageService } from './Services/job-storage.service';
import { Observable, Subject, map, takeUntil, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoggerService } from './Services/logger.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SavedSearchesComponent } from './Components/saved-searches/saved-searches.component';
import { SavedJobsComponent } from './Components/saved-jobs/saved-jobs.component';
import { UserService } from './Services/user.service';
import { UserInterfaceService } from './Services/user-interface.service';
import { TitleTypes } from './Form&Grid-components/grid-title/grid-title.component';
import { SearchParameterNameComponent } from './Components/search-parameter-name/search-parameter-name.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  TitleTypes = TitleTypes;
  title = 'JobSearch';
  jobSearchData: JobSearch = {};
  jobResults: JobDetails[] = [];
  showMySavedJobs: boolean = false;
  showMySavedSearches: boolean = false;
  savedJobs: JobDetails[] = [];
  showAgGrid: boolean = false;
  formPanelOpenState: boolean = true;

  titleContent: boolean = false;
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
          this._snackBar.open(message, '', {
            duration: 3000
          });
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
    this.showAgGrid = true;
    this.formPanelOpenState = false;
    this.titleContent = false;
    this.loggerService.logInfo(this.loggerService.SUBMITTED_MESSAGE);
  }

  homeClicked() {
    this.showMySavedJobs = false;
    this.userInterfaceService.themeChange('light');
  }

  jobSearchEnteredSubmit(inputDetails: JobSearch) {
    this.jobSearchData = inputDetails;
  }
  onClear() {
    this.jobSearchService.clearArray();
    this.loggerService.logInfo(this.loggerService.CLEAR_SUCCESS_MESSAGE);
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
    this.titleContent = true;
    this.formPanelOpenState = false;
    this.loggerService.logInfo(this.loggerService.SAVED_DATA_LOADED);

    this.jobStorageService.getSavedJobs();


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
    const dialogRef = this.dialog.open(SearchParameterNameComponent, {
      data: { jobSearch: jobSearchData },
      width: '300px',
    });
  }

  changeTheme(theme: string) {
    this.userInterfaceService.themeChange(theme);
  }

  loadSavedJobs(){
    const dialogRef = this.dialog.open(SavedJobsComponent, {
      data: this.jobStorageService.savedResults$,
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('success');
    });
  }
  closeSavedJobs(value: boolean){
    if (value === true){
      this.showMySavedJobs = false;
    }else{
      this.showMySavedJobs = true;
    }
  }

  loadSavedSearches(){
    const dialogRef = this.dialog.open(SavedSearchesComponent, {
      data: this.jobStorageService.savedSearchResults$,
      width: '300px',
    })
  }
  closeSavedSearches(value: boolean){
    if (value === true){
      this.showMySavedSearches = false;
    }else{
      this.showMySavedSearches = true;
    }
  }
}
