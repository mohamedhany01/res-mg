import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { addSettings } from 'src/app/store/actions/app.action';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-img-uploader',
  templateUrl: './img-uploader.component.html',
  styleUrls: ['./img-uploader.component.css'],
})
export class ImgUploaderComponent {
  appSettings$: Observable<AppSettings>;
  appSettingsSubscription!: Subscription;

  name: string;

  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointService
  ) {
    this.appSettings$ = this.store.select(selectSettings);
    this.name = '';
  }

  onSubmit() {
    this.store.dispatch(
      addSettings({
        settings: {
          supplier: {
            name: this.name,
          },
        },
      })
    );
  }
}
