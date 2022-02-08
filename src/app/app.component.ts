import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';

  cityList: { name: string, checked: boolean }[];
  stored: string;

  ngOnInit() {
    this.getCities().subscribe((cities: string[]) => {
      const selected: string[] = [];
    
      const stored: string = localStorage.getItem('cities');    
      if (stored) {
        selected.push(...stored.split(','));      
      }

      this.cityList = cities.map(name => ({
        name: name,
        checked: selected.includes(name)
      }));

      this.stored = stored;
    });    
  }

  saveCities() {
    const selected = this.cityList
      .filter(x => x.checked)
      .map(x => x.name);
    
    const serialized = selected.join(',');
    localStorage.setItem('cities', serialized);

    this.stored = localStorage.getItem('cities');
  }

  private getCities(): Observable<string[]> {
    return of([
      'London',
      'Paris',
      'New York',
      'Rome',
    ]);
  }
}
