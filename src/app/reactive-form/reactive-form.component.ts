import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { JobSearch } from 'src/models/job-search.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit{

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

    })
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
