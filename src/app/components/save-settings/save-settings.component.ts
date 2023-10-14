import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-save-settings',
  templateUrl: './save-settings.component.html',
  styleUrls: ['./save-settings.component.css'],
})
export class SaveSettingsComponent {
  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();
  isExtraSmall$: Observable<boolean> = this.breakpointObserver.isExtraSmall();

  constructor(private breakpointObserver: BreakpointService) {}
}
