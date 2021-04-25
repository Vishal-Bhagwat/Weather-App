import { Component, OnInit,Input, Output } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './my-line-chart.component.html',
  styleUrls: ['./my-line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() ForecastData: any;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { 
  }

  ngOnInit() {
    console.log(this.ForecastData);
    let labels = [], temp_min=[], temp_max=[];
    if(this.ForecastData){
      this.ForecastData.forEach(element => {
        temp_min.push(element.temp.min);
        temp_max.push(element.temp.max);
        labels.push(new Date(element.dt *1000).toLocaleDateString());
      });
    }
    
    this.lineChartData.push({ data: temp_min, label: 'Min Temperature' });
    this.lineChartData.push({ data: temp_max, label: 'Max Temperature' });
    this.lineChartLabels = labels;
  }

}
