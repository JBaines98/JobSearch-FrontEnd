import { NgModule, OnInit, EventEmitter, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormGroup } from '@angular/forms';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { JobTableComponent } from './job-table/job-table.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { MyCellComponent } from './my-cell/my-cell.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MyCellMapComponent } from './my-cell-map/my-cell-map.component';
import { NumberOfJobsComponent } from './number-of-jobs/number-of-jobs.component';
import { DeleteMyCellComponent } from './delete-my-cell/delete-my-cell.component';
import { SavedJobsComponent } from './saved-jobs/saved-jobs.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { JobRatingComponent } from './job-rating/job-rating.component';
import { RatingCellComponent } from './rating-cell/rating-cell.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NumberOfJobsSavedComponent } from './number-of-jobs-saved/number-of-jobs-saved.component';
import { MatChipsModule } from '@angular/material/chips';
import { LikedJobsComponent } from './liked-jobs/liked-jobs.component';
import { LikedCellComponent } from './liked-cell/liked-cell.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SavedSearchesComponent } from './saved-searches/saved-searches.component';
import { NumberOfSearchesSavedComponent } from './number-of-searches-saved/number-of-searches-saved.component';
import { OtherJobSitesComponent } from './other-job-sites/other-job-sites.component';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    AppComponent,
    JobDetailsComponent,
    ReactiveFormComponent,
    JobTableComponent,
    AgGridComponent,
    MyCellComponent,
    MyCellMapComponent,
    NumberOfJobsComponent,
    DeleteMyCellComponent,
    SavedJobsComponent,
    JobRatingComponent,
    RatingCellComponent,
    NumberOfJobsSavedComponent,
    LikedJobsComponent,
    LikedCellComponent,
    SavedSearchesComponent,
    NumberOfSearchesSavedComponent,
    OtherJobSitesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatCardModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatSliderModule,
    AgGridModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
    MatExpansionModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
