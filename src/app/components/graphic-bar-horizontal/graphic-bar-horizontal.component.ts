import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphic-bar-horizontal',
  templateUrl: './graphic-bar-horizontal.component.html',
  styleUrls: ['./graphic-bar-horizontal.component.scss']
})
export class GraphicBarHorizontalComponent implements  OnInit ,OnDestroy  {
  @Input() results: any [] = [];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient  = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Games';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme: string = 'nightLights';

  constructor(
  ) {

  }

  ngOnInit(): void {

  }

  onSelect(event:Event) {
    console.log(event);
  }

  ngOnDestroy(): void {

  }

}
