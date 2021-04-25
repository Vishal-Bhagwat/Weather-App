import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(city) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=5ef810451e57a6626c5c39c0a84bd0b4');
  }
  
  getForecastData(lat,lon) {
    return this.http.get('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&appid=5ef810451e57a6626c5c39c0a84bd0b4');
  }
  

}
