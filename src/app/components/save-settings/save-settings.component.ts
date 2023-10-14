import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-save-settings',
  templateUrl: './save-settings.component.html',
  styleUrls: ['./save-settings.component.css'],
})
export class SaveSettingsComponent {
  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();
  isExtraSmall$: Observable<boolean> = this.breakpointObserver.isExtraSmall();

  appSettings$: Observable<AppSettings>;
  appSettingsSubscription!: Subscription;

  constructor(
    private breakpointObserver: BreakpointService,
    private store: Store
  ) {
    this.appSettings$ = this.store.select(selectSettings);
  }

  saveChanges() {
    this.appSettingsSubscription = this.appSettings$.subscribe(settings => {
      alert(JSON.stringify(settings));
    });
  }
}
