import { Injectable } from '@angular/core';
import { UserDetails } from 'src/models/job-search.model';
import { LoggerService } from './logger.service';
import { JobStorageService } from './job-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public loggerService: LoggerService) { 
    this.onSelectedUser(1);
    this.themeChange('light');
  }

  private behaviorNowSelectedUser$ = new BehaviorSubject<UserDetails>({});
  public savedUser$ = this.behaviorNowSelectedUser$.asObservable();

  private behaviorThemeNameSelected$ = new BehaviorSubject<string>('');
  public themeNameSelected$ = this.behaviorThemeNameSelected$.asObservable();

  selectedUser: any = {};

  themeName: string = '';


  users: UserDetails[] = 
  [
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
    },
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
    },
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
    },
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
    }]


  
  onSelectedUser(userId: number){
    var selectedUser = this.users.find(user => user.userId === userId);
    if (!selectedUser){
      alert("Error")
    }else{
    this.behaviorNowSelectedUser$.next(selectedUser);
    this.loggerService.logInfo(this.loggerService.USER_CHANGED);
    }
  }


  themeChange(theme: string){
    this.behaviorThemeNameSelected$.next(theme);
    this.loggerService.logInfo(this.loggerService.THEME_UPDATED);
  }

  // onSelectedDarren9(){
  //   var selectedUser = this.users.find(user => user.userId === 6);
  //   if (!selectedUser){
  //     alert("Error")
  //   }else{
  //   this.behaviorNowSelectedUser$.next(selectedUser);
  //   this.loggerService.logInfo(this.loggerService.USER_CHANGED);
  //   }
  // }

  // onSelectedAmanda1(){
  //   var selectedUser = this.users.find(user => user.userId === 9);
  //   if (!selectedUser){
  //     alert("Error")
  //   }else{
  //   this.behaviorNowSelectedUser$.next(selectedUser);
  //   this.loggerService.logInfo(this.loggerService.USER_CHANGED);
  //   }
  // }

  // onSelectedLaura01(){
  //   var selectedUser = this.users.find(user => user.userId === 10);
  //   if (!selectedUser){
  //     alert("Error")
  //   }else{
  //   this.behaviorNowSelectedUser$.next(selectedUser);
  //   this.loggerService.logInfo(this.loggerService.USER_CHANGED);
  //   }
  // }
  
    
}
