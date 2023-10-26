import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobDetails } from 'src/models/job-search.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {



  
  constructor(@Inject(MAT_DIALOG_DATA) public data: {job: any, message: string}, 
    public dialogRef: MatDialogRef<ConfirmationComponent>){}

  confirmationYes(){
    this.dialogRef.close(true);
  }

  confirmationNo(){
    this.dialogRef.close(false);
  }

}
