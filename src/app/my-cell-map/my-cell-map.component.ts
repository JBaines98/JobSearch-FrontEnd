import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-my-cell-map',
  template: `

    <a href="http://www.google.com/maps/search/?api=1&query={{locationName}}" target="_blank">
      <img style="height: 35px; width: 40px;" src="assets/GoogleMaps.webp">
    </a>
  `,

  styles: [
  ]
})
export class MyCellMapComponent implements OnInit, ICellRendererAngularComp {

  private params: any;

  locationName = '';

  ngOnInit(): void {
    
  }
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: any): void {
    this.locationName = (params.data.locationName);
  }
  btnClickedHandler(event: any){
    this.params.clicked(this.params.data);
  }
}
