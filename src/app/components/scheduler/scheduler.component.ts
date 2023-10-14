import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent {
  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();
  isExtraSmall$: Observable<boolean> = this.breakpointObserver.isExtraSmall();

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
}
