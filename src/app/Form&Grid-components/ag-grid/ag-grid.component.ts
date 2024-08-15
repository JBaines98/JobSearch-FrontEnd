import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { JobDetails } from 'src/models/job-search.model';
import { MyCellComponent } from '../../cell-renderers/my-cell/my-cell.component';
import { JobDetailsComponent } from '../../Components/job-details/job-details.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MyCellMapComponent } from '../../cell-renderers/my-cell-map/my-cell-map.component';
import { JobSearchService } from '../../Services/job-search.service'
import { Subject, takeUntil, tap } from 'rxjs';
import { DeleteMyCellComponent } from '../../cell-renderers/delete-my-cell/delete-my-cell.component';
import { JobStorageService } from '../../Services/job-storage.service';
import { RatingCellComponent } from '../../cell-renderers/rating-cell/rating-cell.component';
import { LikedCellComponent } from '../../cell-renderers/liked-cell/liked-cell.component';
import { CommentCellComponent } from '../../cell-renderers/comment-cell/comment-cell.component';
import { CommentComponent } from '../../Components/comment/comment.component';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: ['./ag-grid.component.scss'],
})
export class AgGridComponent implements OnInit, OnDestroy {
  @Input() jobResults : JobDetails[] = [];
  @Input() reedReturnData: boolean = false;
  @Input() savedJobsReturnData: boolean = false;
  @Input() showAGTitle: boolean = false;

   public destroyed$ = new Subject();
   public selectedJobs: JobDetails[]=[];
   public gridApi: GridApi | undefined;

  constructor(public dialog: MatDialog,
     public jobSearchService: JobSearchService,
     public jobStorageService: JobStorageService){ }

  ngOnInit(): void {}

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


  gridOptions: GridOptions = {
    rowClass: 'jacks-row',
    rowSelection: 'multiple',
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
      commentButtonRenderer: CommentCellComponent
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
    {
      headerName: 'Comment',
      field: 'jobComment',
      resizable: true,
      rowDrag: true,
      cellRenderer: 'commentButtonRenderer',
      cellRendererParams: {
        clicked: (jobDetail: any) => {
          const dialogRef = this.dialog.open(CommentComponent,{
            data: {jobDetail: jobDetail}
          })


        }
      }
    }
  ];
}
