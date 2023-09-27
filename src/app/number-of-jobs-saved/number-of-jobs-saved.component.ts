import { Component } from '@angular/core';
import { JobStorageService } from '../job-storage.service';
import { Observable, map, tap, } from 'rxjs';

@Component({
  selector: 'app-number-of-jobs-saved',
  templateUrl: './number-of-jobs-saved.component.html',
  styleUrls: ['./number-of-jobs-saved.component.css']
})
export class NumberOfJobsSavedComponent {

 public jobCount: number = 0;

  constructor(public jobStorageService: JobStorageService){}

  // ngOnInit(){
  //   this.jobStorageService.savedResults$.pipe(
  //     tap((bob) => {
  //       this.jobCount = bob.length;
  //     })
  //   ).subscribe();
  // }
}
