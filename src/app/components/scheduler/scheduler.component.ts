import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent {
  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();
  isExtraSmall$: Observable<boolean> = this.breakpointObserver.isExtraSmall();

  constructor(private breakpointObserver: BreakpointService) {}
}
