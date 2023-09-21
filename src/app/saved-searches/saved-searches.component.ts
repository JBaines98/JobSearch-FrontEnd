import { Component } from '@angular/core';
import { JobStorageService } from '../job-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobSearch } from 'src/models/job-search.model';
import { Observable, map, tap, } from 'rxjs';

@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.css']
})
export class SavedSearchesComponent {


  constructor(public jobStorageService: JobStorageService, public dialog: MatDialog){}

  savedSearches: JobSearch[]=[];

  ngOnInit(){
    this.jobStorageService.savedSearchResults$.pipe(
      tap((results) => {
        this.savedSearches = results;

      })
    ).subscribe();
  }
}
