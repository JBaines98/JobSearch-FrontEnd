import { Component, Input } from '@angular/core';

export enum TitleTypes{
  SearchData = 'SearchData',
  SavedData = 'SavedData',
}

@Component({
  selector: 'app-grid-title',
  templateUrl: './grid-title.component.html',
  styleUrls: ['./grid-title.component.scss']
})
export class GridTitleComponent {

  @Input() titleType: TitleTypes = TitleTypes.SearchData;

  TitleTypes = TitleTypes;

}
