import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { addSettings } from 'src/app/store/actions/app.action';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css'],
})
export class ResourceTypeComponent {
  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();

  appSettings$: Observable<AppSettings>;
  appSettingsSubscription!: Subscription;

  multiple: boolean | undefined;
  once: boolean | undefined;

  constructor(
    private breakpointObserver: BreakpointService,
    private store: Store
  ) {
    this.appSettings$ = this.store.select(selectSettings);

    this.appSettings$.subscribe(settings => {
      this.once = settings.resourceType?.oneDay;
      this.multiple = settings.resourceType?.moreThanOneDay;
    });
  }

  onChange() {
    this.store.dispatch(
      addSettings({
        settings: {
          resourceType: {
            oneDay: this.once,
            moreThanOneDay: this.multiple,
          },
        },
      })
    );
  }
}
