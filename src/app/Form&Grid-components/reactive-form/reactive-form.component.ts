import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { JobSearch } from 'src/models/job-search.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { LoggerService } from '../../Services/logger.service';
import { UserInterfaceService } from '../../Services/user-interface.service';
import { JobSearchService } from 'src/app/Services/job-search.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent implements OnInit, OnDestroy{

  public jobSearch: JobSearch = {};
  public destroyed$ = new Subject();
  public themeName: string = '';



  constructor(
    public userService: UserService,
    public jobSearchService: JobSearchService, 
    public loggerService: LoggerService,
    public userInterfaceService: UserInterfaceService){}

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
    jobTitle: new FormControl(''),
    employerName: new FormControl(''),
    minimumSalary: new FormControl(0),
    date: new FormControl(new Date()),

    keywords: new FormControl(''),
    fullTime: new FormControl(false),
    contract: new FormControl(false)
  });
  

  
  ngOnInit(): void{
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

   this.jobSearchService.searchParameters$.pipe(
    tap(searchParameters => {
      this.jobSearch = searchParameters;
      this.reactiveForm.setValue({
        jobTitle: this.jobSearch.jobTitle || '',
        employerName: this.jobSearch.employerName || '',
        minimumSalary: this.jobSearch.minimumSalary || 0,
        date: this.jobSearch.date || null,
        keywords: this.jobSearch.keywords || '',
        fullTime: this.jobSearch.fullTime || false,
        contract: this.jobSearch.contract || false,
      });
    }),
    takeUntil(this.destroyed$)
   ).subscribe();
   

   
  }


}
