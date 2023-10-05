import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { LoggerService } from '../logger.service';
import { MatButtonModule } from '@angular/material/button';
import { UserDetails } from 'src/models/job-search.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent implements OnDestroy{

  public destroyed$ = new Subject();
  public themeName: string = 'light';

  constructor(public userService: UserService, public loggerService: LoggerService){}
  
  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  ngOnInit(){
    this.userService.themeNameSelected$.pipe(
      tap(theme => {
        this.themeName = theme;
      }),
      takeUntil(this.destroyed$)
    ).subscribe();
  }

  
  clickedUser(userId: number){
    this.userService.onSelectedUser(userId);
  }

}
