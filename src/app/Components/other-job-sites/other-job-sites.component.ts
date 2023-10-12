import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-other-job-sites',
  templateUrl: './other-job-sites.component.html',
  styleUrls: ['./other-job-sites.component.scss']
})
export class OtherJobSitesComponent {
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  panelOpenState3: boolean = false;
}
