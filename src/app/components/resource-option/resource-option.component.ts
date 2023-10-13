import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-resource-option',
  templateUrl: './resource-option.component.html',
  styleUrls: ['./resource-option.component.css'],
})
export class ResourceOptionComponent implements OnInit {
  loadedSettings: AppSettings | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectSettings).subscribe(settings => {
      // console.log(settings.resourceAvailability?.availabilityTime);
      if (settings) {
        this.loadedSettings = settings;
      }
    });
  }
}
