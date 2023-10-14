import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { addSettings } from 'src/app/store/actions/app.action';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-resource-option',
  templateUrl: './resource-option.component.html',
  styleUrls: ['./resource-option.component.css'],
})
export class ResourceOptionComponent {
  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();
  appSettings$: Observable<AppSettings>;
  appSettingsSubscription!: Subscription;

  serviceTime: boolean | undefined;
  fixedTime: boolean | undefined;
  availabilityTime: string | undefined;
  multiple: boolean | undefined;
  once: boolean | undefined;

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointService
  ) {
    this.appSettings$ = this.store.select(selectSettings);
    this.appSettings$.subscribe(settings => {
      this.availabilityTime = settings.resourceAvailability?.availabilityTime;
      this.serviceTime =
        settings.resourceAvailability?.resourceTime?.serviceTime;
      this.fixedTime = settings.resourceAvailability?.resourceTime?.fixedTime;

      this.once = settings.resourceAvailability?.reservation?.once;
      this.multiple = settings.resourceAvailability?.reservation?.multiple;
    });
  }

  onSubmit() {
    this.store.dispatch(
      addSettings({
        settings: {
          resourceAvailability: {
            availabilityTime: this.availabilityTime,
            resourceTime: {
              serviceTime: this.serviceTime,
              fixedTime: this.fixedTime,
            },
            reservation: {
              once: this.once,
              multiple: this.multiple,
            },
          },
        },
      })
    );
  }

  onChange() {
    this.store.dispatch(
      addSettings({
        settings: {
          resourceAvailability: {
            availabilityTime: this.availabilityTime,
            resourceTime: {
              serviceTime: this.serviceTime,
              fixedTime: this.fixedTime,
            },
            reservation: {
              once: this.once,
              multiple: this.multiple,
            },
          },
        },
      })
    );
  }
}
