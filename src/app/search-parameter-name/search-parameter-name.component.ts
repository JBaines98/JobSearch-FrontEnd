import { Component, Inject, OnDestroy } from '@angular/core';
import { LoggerService } from '../Services/logger.service';
import { JobSearch } from 'src/models/job-search.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobStorageService } from '../Services/job-storage.service';
import { UserInterfaceService } from '../Services/user-interface.service';
import { Observable, Subject, map, takeUntil, tap, } from 'rxjs';

@Component({
  selector: 'app-search-parameter-name',
  templateUrl: './search-parameter-name.component.html',
  styleUrls: ['./search-parameter-name.component.scss']
})
export class SearchParameterNameComponent implements OnDestroy {

  public searchData: JobSearch = {};

  public themeName: string = '';

  public destroyed$ = new Subject();


  constructor(
    public loggerService: LoggerService,
    public jobStorageService: JobStorageService,
    public userInterfaceService: UserInterfaceService,
    @Inject(MAT_DIALOG_DATA) public data: {jobSearch: JobSearch}
  ){
    this.searchData = data.jobSearch;
  }
  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  ngOnInit(){
    this.userInterfaceService.themeNameSelected$.pipe(
      tap((theme) => {
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  saveTheseParameters(searchData: JobSearch){
    this.jobStorageService.saveMySearch(searchData);
  }
}
