import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  WeatherData: any;
  ForecastData: any;
  displayedColumns: string[] = ['dt', 'weather', 'temp','humidity','pressure'];
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatSort,{static:true}) sort: MatSort;
  city: any;
  isMenuOpen: boolean;

  constructor(private _weatherService : WeatherService, public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.getWeatherByLocation('Pune');
    this.dataSource.sort = this.sort;   
    this.updateResponsiveChanges(); 
  }
  
  getWeatherByLocation(city){
    this._weatherService.getWeatherData(city)
    .subscribe((data: any) => {
      this.WeatherData = data;
      this.get7DayForecastData(data.coord.lat, data.coord.lon);
    },
    (error) => {  
      console.error('error caught here', error);
      alert(error.error.message);   
    });
  }

  get7DayForecastData (lat,lon){
    this._weatherService.getForecastData(lat,lon)
    .subscribe((data: any) => {
      this.ForecastData = data.daily;
      this.dataSource = new MatTableDataSource(data.daily);
      this.dataSource.sort = this.sort;
      
      this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'temp': {
              return item[property].day;
            }
            case 'dt': {
                let newDate = new Date(item.dt);
              return newDate;
            }
            default: {
              return item[property];
            }
          }
      }
    },
    (error) => {
      console.log('error caught ', error);
      alert(error.error.message);
    });
  }

  searchWeatherInfo() {
    console.log(this.city);
    this.getWeatherByLocation(this.city);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateResponsiveChanges() {
    this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMenuOpen = false;
          this.displayedColumns = ['dt', 'weather', 'temp','humidity','pressure'];
        } else {
          this.isMenuOpen = true;
          this.displayedColumns = ['dt', 'weather', 'temp'];
        }
    });
  }

}
