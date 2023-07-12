import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { JobDetails } from 'src/models/job-search.model';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent {

  @Input() jobDetail: JobDetails = {};
}
