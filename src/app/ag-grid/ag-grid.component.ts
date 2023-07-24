import { Component, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { JobDetails } from 'src/models/job-search.model';
import { MyCellComponent } from '../my-cell/my-cell.component';
import { JobDetailsComponent } from '../job-details/job-details.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyCellMapComponent } from '../my-cell-map/my-cell-map.component';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.css'],
})
export class AgGridComponent {
  @Input() jobResults: JobDetails[] = [];

  constructor(public dialog: MatDialog){}

  gridOptions: GridOptions = {
    rowClass: 'jacks-row',
    // colResizeDefault: true,
    defaultColDef: {
      resizable: true,
      filter: true,
    },
    components: {
      buttonRenderer: MyCellComponent,
      buttonRendererMap: MyCellMapComponent,
      
    },
    
  };

  columnDefs: any[] = [
    { headerName: 'Job Title', field: 'jobTitle', sortable: true, resizable: true },
    { headerName: 'Employer Name', field: 'employerName', sortable: true, resizable: true },
    {
      headerName: 'Minimum Salary (£)',
      field: 'minimumSalary',
      sortable: true,
      resizable: true
    },

    { headerName: 'Location',
     field: 'locationName',
     sortable: true, 
     resizable: true,
     cellRenderer: 'buttonRendererMap',
     cellRendererParams: {
      function(params: { data: {locationName: any}}){
        let location = params.data.locationName;
        // let newMapLink = `<a href="${location}"   target="_blank">Click here</a>`;

      }
     },
    },
    
    {
      headerName: 'Job Details',
      field: 'JobDetail',
      sortable: true,
      resizable: true,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        clicked: (jobDetail: any) => {
            const dialogRef = this.dialog.open(JobDetailsComponent,{
              width: '250px',
              data: jobDetail
        })
            }}
        

          // alert(`
          // Job Title: ${jobDetail.jobTitle}
          // Job ID: ${jobDetail.jobId}
          // Employer ID: ${jobDetail.employerID}
          // Employer Name: ${jobDetail.employerName}
          // Employer Profile ID: ${jobDetail.employerProfileId}
          // Employer Profile Name: ${jobDetail.employerProfileName}
          // Location: ${jobDetail.locationName}
          // Minimum Salary : ${jobDetail.minimumSalary}
          // Maximum Salary : ${jobDetail.maximumSalary}
          // Currency: ${jobDetail.currency}
          // Expiration Date: ${jobDetail.expirationDate}
          // Date Posted: ${jobDetail.date}
          // Number of Applicants: ${jobDetail.applications}
          // Job Description: ${jobDetail.jobDescription}
          // `)
        //  alert(JSON.stringify(jobDetail));
        },


    {
      headerName: 'Link',
      field: 'jobUrl',
      resizable: true,
      cellRenderer: 'buttonRenderer',
      function(params: { data: { jobUrl: any } }) {
        let keyData = params.data.jobUrl;
        let newLink = `<a href="${keyData}"      target="_blank">Click here</a>`;
        return newLink;
      },
    },
  ];
}
