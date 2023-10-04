import { Component, OnDestroy } from '@angular/core';
import { JobStorageService } from '../job-storage.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserService } from '../user.service';
import { UserInterfaceService } from '../user-interface.service';

@Component({
  selector: 'app-number-of-searches-saved',
  templateUrl: './number-of-searches-saved.component.html',
  styleUrls: ['./number-of-searches-saved.component.css']
})
export class NumberOfSearchesSavedComponent implements OnDestroy {

  public searchCount: any = 0;
  public themeName: string = 'light';
  public destroyed$ = new Subject();

  constructor(public jobStorageService: JobStorageService, public userService: UserService, public userInterfaceService: UserInterfaceService){}


  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }


  ngOnInit(){
    this.jobStorageService.savedSearchResults$.pipe(
      tap((results) => {
        this.searchCount = results.length;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();

    this.userInterfaceService.themeNameSelected$.pipe(
      tap(theme => {
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }


}
