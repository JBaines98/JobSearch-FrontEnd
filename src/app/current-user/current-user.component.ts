import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserDetails } from 'src/models/job-search.model';
import { Subject, takeUntil, tap } from 'rxjs';
import { LoggerService } from '../logger.service';
import { UserInterfaceService } from '../user-interface.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss']
})
export class CurrentUserComponent implements OnDestroy {
  
  public destroyed$ = new Subject();
  public selectedUserName?: string = '';
  public themeName: string = 'light';

  constructor(public userService: UserService, public loggerService: LoggerService, public userInterfaceService: UserInterfaceService){

    this.userService.savedUser$.pipe(
      tap((user) => {
        this.selectedUserName = user.userName;
      }),
      takeUntil(this.destroyed$)
    ).subscribe(); 
  }

  ngOnInit(){
    this.userInterfaceService.themeNameSelected$.pipe(
      tap(theme => {
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }





}
