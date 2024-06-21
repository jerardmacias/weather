import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from './shared/interfaces/weather.interface';
import { WeatherService } from './pages/weather/services/weather.services';
import { GeoLocationService } from './shared/services/geo-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public weather$!: Observable<WeatherData>;
  constructor(
    private readonly weatherService: WeatherService,
    private readonly getLocationService: GeoLocationService
  ) {
    if (navigator?.geolocation) {
      this.getLocation();
    }
  }

  public onSearch(city: string): void {
    this.weather$ = this.weatherService.getWeatherByName(city)
  }

  private async getLocation(): Promise<void> {
    try {
      const { coords } = await this.getLocationService.getCurrentPosition();
      this.weather$ = this.weatherService.getWeatherByCoords(coords);
      console.log(coords);
    } catch (error) {
      console.log(error);
    }
  }
}
