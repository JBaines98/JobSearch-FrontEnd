import { Component, OnDestroy } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { LoggerService } from '../../Services/logger.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnDestroy{

  public destroyed$ = new Subject();

  constructor(public userService: UserService, public loggerService: LoggerService){}


  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  clickedUser(userId: number){
    this.userService.onSelectedUser(userId);
  }

}
