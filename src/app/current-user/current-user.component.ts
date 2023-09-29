import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { UserDetails } from 'src/models/job-search.model';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent {

  constructor(public userService: UserService){}

  selectedUser: UserDetails = {};



  ngOnInit(){
    this.selectedUser = this.userService.user;
  }

}
