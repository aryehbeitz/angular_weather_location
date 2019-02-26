import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  api_key: any = '6d3062fb0123d7beb886112519145889';
  baseWeatherApi: any;
  weatherDescription: any;

  constructor( private httpClient: HttpClient) {
    this.baseWeatherApi = `http://api.openweathermap.org/data/2.5/weather?APPID=${this.api_key}`;
  }

  weatherByAddress(address) {
    const encodedAddress = encodeURI(address.detail.value);
    this.apiCall(`${this.baseWeatherApi}&q=${encodedAddress}`).subscribe(response => {
      this.weatherDescription = response.weather[0].main;
      console.log(response);
    });
  }

  apiCall(url) {
    return this.httpClient.get<any>(
      url,
      {
        observe: 'body',
        responseType: 'json'
      }
    );
  }
}
