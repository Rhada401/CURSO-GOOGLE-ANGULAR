import { Component, inject, Inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';


@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule ,HousingLocationComponent],
  template: `
   <section>
    <form>
      <input type="text" placeholder="Search" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Procurar</button>
    </form>
   </section>

   <app-housing-location *ngFor="let housingLocation of filteredLocationList"
    [housingLocation]="housingLocation"></app-housing-location>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject (HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }

  filterResults(text: string) {
    if (!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    )
  }

}
