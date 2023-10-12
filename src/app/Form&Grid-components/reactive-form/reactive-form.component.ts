import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { JobSearch } from 'src/models/job-search.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { LoggerService } from '../../Services/logger.service';
import { UserInterfaceService } from '../../Services/user-interface.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit, OnDestroy{

  public destroyed$ = new Subject();
  public themeName: string = '';

  constructor(public userService: UserService, public loggerService: LoggerService, public userInterfaceService: UserInterfaceService){}

  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

@Output() jobSearchEntered = new EventEmitter<JobSearch>();


  reactiveForm = new FormGroup({
    jobTitle: new FormControl(null),
    employerName: new FormControl(null),
    minimumSalary: new FormControl(null),
    date: new FormControl(null),

    keywords: new FormControl(null),
    fullTime: new FormControl(null),
    contract: new FormControl(null)
  });
  

  ngOnInit(): void{
    // console.log(this.jobTitle)
   this.reactiveForm.valueChanges.pipe(
    tap(changes => {
      this.jobSearchEntered.emit(changes as JobSearch);
      console.log(JSON.stringify(changes));

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

  // onChanges(event: any){
  //   console.log(this.jobSearchEntered);
  //   let search: JobSearch = {
  //     keywords: this.reactiveForm.get('keywords')?.value || undefined,
  //     jobTitle: this.reactiveForm.get('jobTitle')?.value || undefined,
  //     employerName: this.reactiveForm.get('employerName')?.value || undefined,
  //     minimumSalary: this.reactiveForm.get('minimumSalary')?.value || undefined,
  //     date: this.reactiveForm.get('date')?.value || undefined,
  //     fullTime: this.reactiveForm.get('fulltime')?.value || undefined,
  //     contract: this.reactiveForm.get('contract')?.value || undefined

  //   };
  //   this.jobSearchEntered.emit(search);
  // }

}
