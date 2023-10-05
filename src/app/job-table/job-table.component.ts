import { Component, Input } from '@angular/core';
import { JobDetails } from 'src/models/job-search.model';


@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss']
})
export class JobTableComponent {

  @Input() jobResults: JobDetails[] = [];

  displayRow(index: number){
    if (index % 2 === 0){
      return "evenRow"
    }else{
      return "oddRow"
    }
  };


}
