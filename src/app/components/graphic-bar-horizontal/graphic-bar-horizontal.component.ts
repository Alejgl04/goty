import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-graphic-bar-horizontal',
  templateUrl: './graphic-bar-horizontal.component.html',
  styleUrls: ['./graphic-bar-horizontal.component.scss']
})
export class GraphicBarHorizontalComponent implements OnDestroy  {
  results: any[] =  [
    {
      "name": "Game 1",
      "value": 8940000
    },
    {
      "name": "Game 2",
      "value": 5000000
    },
    {
      "name": "Game 3",
      "value": 7200000
    },
    {
      "name": "Game 4",
      "value": 5600000
    },
    {
      "name": "Game 5",
      "value": 850000
    }
  ];


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
  interval: any;

  constructor() {

    this.interval = setInterval( () => {
      console.log('tick');
      const newResults = [...this.results];
      for (let i in this.results ) {
        this.results[i].value = Math.round( Math.random() * 500 );
      }
      this.results = [...newResults];
    },1500);
  }

  onSelect(event:Event) {
    console.log(event);
  }

  ngOnDestroy(): void {
    clearInterval( this.interval );
  }

}
