import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  constructor( private countryservice: CountriesService) {}

  public searchByRegion(region: string) {

    this.countryservice.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
      });
  }
}
