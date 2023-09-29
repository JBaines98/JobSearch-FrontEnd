import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { LoggerService } from '../logger.service';
import { MatButtonModule } from '@angular/material/button';
import { UserDetails } from 'src/models/job-search.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent {

  constructor(public userService: UserService, public loggerService: LoggerService){}

  
  clickedJack98(){
    this.userService.onSelectedJack98();
  }

  clickedDarren9(){
    this.userService.onSelectedDarren9();
  }

  clickedAmanda1(){
    this.userService.onSelectedAmanda1();
  }

  clickedLaura01(){
    this.userService.onSelectedLaura01();
  }

}
