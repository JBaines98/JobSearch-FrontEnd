import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobDetails } from 'src/models/job-search.model';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent {

  public showDescription: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<JobDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: JobDetails,){}


    // showAllDescription(){
    //   this.showDescription = true;
    // }

}
