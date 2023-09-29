import { Injectable } from '@angular/core';
import { UserDetails } from 'src/models/job-search.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public loggerService: LoggerService ) { }

  selectedUser: any = 'Jack98';

  user: UserDetails = 
  { userId: 1, 
    userName: 'Jack98',
    firstName: 'Jack',
    lastName: 'Baines',
    dateJoined: '20-09-2023',
    age: 24,
    addressFirstLine: '5, Four sisters way',
    addressSecondLine: 'Eastwood',
    city: 'Leigh-on-sea',
    county: 'Essex',
    postcode: 'SS95FQ'
  }
  user2: UserDetails = 
  { userId: 6, 
    userName: 'Darren9',
    firstName: 'Darren',
    lastName: 'Baines',
    dateJoined: '01-01-2001',
    age: 99,
    addressFirstLine: 'test',
    addressSecondLine: 'test',
    city: 'test',
    county: 'test',
    postcode: 'SS95FQ'
  }
  user3: UserDetails =
  { userId: 9, 
    userName: 'Amanda1',
    firstName: 'Amanda',
    lastName: 'Baines',
    dateJoined: '01-01-2010',
    age: 50,
    addressFirstLine: '5, Four sisters way',
    addressSecondLine: 'Eastwood',
    city: 'Leigh-on-sea',
    county: 'Essex',
    postcode: 'SS95FQ'
  }
  user4: UserDetails =
  { userId: 10, 
    userName: 'Laura01',
    firstName: 'Laura',
    lastName: 'Baines',
    dateJoined: '24-07-2010',
    age: 30,
    addressFirstLine: '5, Four sisters way',
    addressSecondLine: 'Eastwood',
    city: 'Leigh-on-sea',
    county: 'Essex',
    postcode: 'SS95FQ'
  }

  onSelectedJack98(){
    this.selectedUser = this.user;
    this.loggerService.logInfo(this.loggerService.USER_CHANGED);
  }

  onSelectedDarren9(){
    this.selectedUser = this.user2;
    this.loggerService.logInfo(this.loggerService.USER_CHANGED);
  }

  onSelectedAmanda1(){
    this.selectedUser = this.user3;
    this.loggerService.logInfo(this.loggerService.USER_CHANGED);
  }

  onSelectedLaura01(){
    this.selectedUser = this.user4;
    this.loggerService.logInfo(this.loggerService.USER_CHANGED);
  }
  
    
}
