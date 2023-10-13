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
  newSettings: AppSettings;

  constructor(private store: Store) {
    const availabilityTime =
      this.loadedSettings?.resourceAvailability?.availabilityTime;

    const fixedTime =
      this.loadedSettings?.resourceAvailability?.resourceTime?.fixedTime;
    const serviceTime =
      this.loadedSettings?.resourceAvailability?.resourceTime?.serviceTime;

    const once = this.loadedSettings?.resourceAvailability?.reservation?.once;

    const multiple =
      this.loadedSettings?.resourceAvailability?.reservation?.multiple;

    this.newSettings = {
      ...this.loadedSettings,
      supplier: this.loadedSettings?.supplier!,
      resourceAvailability: {
        availabilityTime: availabilityTime ? availabilityTime : '',
        resourceTime: {
          fixedTime: fixedTime ? fixedTime : false,
          serviceTime: serviceTime ? serviceTime : false,
        },
        reservation: {
          once: once ? once : false,
          multiple: multiple ? multiple : false,
        },
      },
    };
  }

  ngOnInit() {
    this.store.select(selectSettings).subscribe(settings => {
      if (settings) {
        this.loadedSettings = settings;
      }
    });
  }
}
