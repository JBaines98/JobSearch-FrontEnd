import { Component } from '@angular/core';
import { JobStorageService } from '../job-storage.service';

@Component({
  selector: 'app-number-of-searches-saved',
  templateUrl: './number-of-searches-saved.component.html',
  styleUrls: ['./number-of-searches-saved.component.css']
})
export class NumberOfSearchesSavedComponent {

  public searchCount: number = 0;

  constructor(public jobStorageService: JobStorageService){}


  ngOnInit(){
    this.searchCount = this.jobStorageService.searchCount;
  }


}
