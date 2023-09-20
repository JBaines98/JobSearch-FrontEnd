import { Injectable } from '@angular/core';
import { UserDetails } from 'src/models/job-search.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
    

  
    
}
