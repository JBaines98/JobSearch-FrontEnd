import { Component, Inject } from '@angular/core';
import { LoggerService } from '../Services/logger.service';
import { JobSearch } from 'src/models/job-search.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobStorageService } from '../Services/job-storage.service';

@Component({
  selector: 'app-search-parameter-name',
  templateUrl: './search-parameter-name.component.html',
  styleUrls: ['./search-parameter-name.component.scss']
})
export class SearchParameterNameComponent {

  public searchData: JobSearch = {};


  constructor(
    public loggerService: LoggerService,
    public jobStorageService: JobStorageService,
    @Inject(MAT_DIALOG_DATA) public data: {jobSearch: JobSearch}
  ){
    this.searchData = data.jobSearch;
  }

  saveTheseParameters(searchData: JobSearch){
    this.jobStorageService.saveMySearch(searchData);
  }
}
