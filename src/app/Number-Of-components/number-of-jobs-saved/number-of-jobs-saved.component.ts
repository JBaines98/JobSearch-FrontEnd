import { Component, OnDestroy } from '@angular/core';
import { JobStorageService } from '../../Services/job-storage.service';
import { Observable, Subject, map, takeUntil, tap, } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { UserInterfaceService } from '../../Services/user-interface.service';

@Component({
  selector: 'app-number-of-jobs-saved',
  templateUrl: './number-of-jobs-saved.component.html',
  styleUrls: ['./number-of-jobs-saved.component.scss']
})
export class NumberOfJobsSavedComponent implements OnDestroy{

 public jobCount: number = 0;
 public themeName: string = 'light';
 public destroyed$ = new Subject();

  constructor(public jobStorageService: JobStorageService, public userService: UserService, public userInterfaceService: UserInterfaceService){}

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  ngOnInit(){
    this.userInterfaceService.themeNameSelected$.pipe(
      tap(theme =>{
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }


}
