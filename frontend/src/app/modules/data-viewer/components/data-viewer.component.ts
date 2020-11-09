import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-viewer',
  templateUrl: './data-viewer.component.html',
  styleUrls: ['./data-viewer.component.css']
})
export class DataViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChartSettingsChanged(){
    console.log("Detected a change in the chart settings")
  }
}
