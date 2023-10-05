import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { JobDetails } from 'src/models/job-search.model';
import { MyCellComponent } from '../my-cell/my-cell.component';
import { JobDetailsComponent } from '../job-details/job-details.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyCellMapComponent } from '../my-cell-map/my-cell-map.component';
import { JobSearchService } from '../job-search.service'
import { Subject, takeUntil, tap } from 'rxjs';
import { DeleteMyCellComponent } from '../delete-my-cell/delete-my-cell.component';
import { JobStorageService } from '../job-storage.service';
import { RatingCellComponent } from '../rating-cell/rating-cell.component';
import { LikedCellComponent } from '../liked-cell/liked-cell.component';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
})
export class AgGridComponent implements OnInit, OnDestroy {
   public jobResults: JobDetails[] = [];
   public destroyed$ = new Subject();
   public selectedJobs: JobDetails[]=[];
   
   public gridApi: GridApi | undefined;

  constructor(public dialog: MatDialog,
     public jobSearchService: JobSearchService,
     public jobStorageService: JobStorageService){ }

  ngOnInit(): void {
    this.jobSearchService.searchResults$
    .pipe(
      tap(results => this.jobResults = results),
      takeUntil(this.destroyed$)
    )
    .subscribe();
    
  }
  ngOnDestroy(): void {
    this.destroyed$.next(this.destroyed$);
    this.destroyed$.complete();
  }
  onSelectedDelete(){
    this.jobSearchService.deleteSelectedJobs(this.selectedJobs);
  }
  isSelected(){
    this.selectedJobs = this.gridApi!.getSelectedRows();
  }

  gridReady(event: GridReadyEvent){
    this.gridApi = event.api;
  }
  onSelectedSave(){
    this.jobStorageService.saveMyJobs(this.selectedJobs);
  }
  onSelectedAdd(){
    // this.jobStorageService.addMyJobs(this.selectedJobs).subscribe();
  }

  gridOptions: GridOptions = {
    rowClass: 'jacks-row',
    rowSelection: 'multiple',
    // colResizeDefault: true,
    defaultColDef: {
      resizable: true,
      filter: true,
      
    },
    
    components: {
      buttonRenderer: MyCellComponent,
      buttonRendererMap: MyCellMapComponent,
      deleteButtonRenderer: DeleteMyCellComponent,
      ratingButtonRenderer: RatingCellComponent, 
      likedButtonRenderer: LikedCellComponent,
    },
    
  };

  columnDefs: any[] = [

    {
    headerName: 'Check Box',
    field: 'checkBox',
    sortable: true,
    resizable: true,
    checkboxSelection: true,
    rowMultiSelectWithClick: true,
    cellRendererParams: {
      clicked: (jobDetail: JobDetails) => {
        this.selectedJobs.push(jobDetail);
      }
    }
  },
    
    
    { headerName: 'Job Title', field: 'jobTitle', sortable: true, resizable: true },
    { headerName: 'Employer Name', field: 'employerName', sortable: true, resizable: true },
    {
      headerName: 'Minimum Salary (£)',
      field: 'minimumSalary',
      sortable: true,
      resizable: true,
      rowDrag: true,
    },

    { headerName: 'Location (Google maps)',
     field: 'locationName',
     sortable: true, 
     resizable: true,
     rowDrag: true,
     width: 230,
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
      rowDrag: true,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        clicked: (jobDetail: any) => {
            const dialogRef = this.dialog.open(JobDetailsComponent,{
              width: 'fit-content',
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
      rowDrag: true,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        function(params: { data: { jobUrl: any } }) {
          let keyData = params.data.jobUrl;
          let newLink = `<a href="${keyData}"      target="_blank">Click here</a>`;
          return newLink;
        },
      }

    },
    {
      headerName: 'Rating',
      field: 'jobRating',
      resizable: true,
      rowDrawg: true,
      width: 290,
      cellRenderer: 'ratingButtonRenderer',
      cellRendererParams: {
        
      }
    },
    {
      headerName: 'Liked',
      field: 'jobLiked',
      resizable: true,
      rowDrag: true,
      width: 230,
      cellRenderer: 'likedButtonRenderer',
      
    },
    {
      headerName: 'Delete Job',
      field: 'deleteJob',
      resizable: true,
      rowDrag: true,
      cellRenderer: 'deleteButtonRenderer',
      cellRendererParams: {
        clicked: (jobDetail: any) => {
          this.jobSearchService.deleteJob(jobDetail);
        },
      }

    },
  ];
}
