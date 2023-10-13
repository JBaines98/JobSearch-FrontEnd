import { NgModule, OnInit, EventEmitter, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobDetailsComponent } from './Components/job-details/job-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, FormGroup } from '@angular/forms';
import { ReactiveFormComponent } from './Form&Grid-components/reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { JobTableComponent } from './Form&Grid-components/job-table/job-table.component';
import { AgGridComponent } from './Form&Grid-components/ag-grid/ag-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { MyCellComponent } from './cell-renderers/my-cell/my-cell.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MyCellMapComponent } from './cell-renderers/my-cell-map/my-cell-map.component';
import { NumberOfJobsComponent } from './Number-Of-components/number-of-jobs/number-of-jobs.component';
import { DeleteMyCellComponent } from './cell-renderers/delete-my-cell/delete-my-cell.component';
import { SavedJobsComponent } from './Components/saved-jobs/saved-jobs.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { JobRatingComponent } from './Components/job-rating/job-rating.component';
import { RatingCellComponent } from './cell-renderers/rating-cell/rating-cell.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { NumberOfJobsSavedComponent } from './Number-Of-components/number-of-jobs-saved/number-of-jobs-saved.component';
import { MatChipsModule } from '@angular/material/chips';
import { LikedJobsComponent } from './Components/liked-jobs/liked-jobs.component';
import { LikedCellComponent } from './cell-renderers/liked-cell/liked-cell.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SavedSearchesComponent } from './Components/saved-searches/saved-searches.component';
import { NumberOfSearchesSavedComponent } from './Number-Of-components/number-of-searches-saved/number-of-searches-saved.component';
import { OtherJobSitesComponent } from './Components/other-job-sites/other-job-sites.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SelectUserComponent } from './User-components/select-user/select-user.component';
import { CurrentUserComponent } from './User-components/current-user/current-user.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { UserMenuComponent } from './User-components/user-menu/user-menu.component';
import { GridTitleComponent } from './Form&Grid-components/grid-title/grid-title.component';
import { CommentCellComponent } from './cell-renderers/comment-cell/comment-cell.component';
import { CommentComponent } from './Components/comment/comment.component';
import { SocialMediaIconsComponent } from './Components/social-media-icons/social-media-icons.component';
import { SearchParameterNameComponent } from './search-parameter-name/search-parameter-name.component';


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
    OtherJobSitesComponent,
    SelectUserComponent,
    CurrentUserComponent,
    UserMenuComponent,
    GridTitleComponent,
    CommentCellComponent,
    CommentComponent,
    SocialMediaIconsComponent,
    SearchParameterNameComponent
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
    MatExpansionModule,
    MatButtonToggleModule,
    MatMenuModule
    
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
