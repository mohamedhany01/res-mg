import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';

@Component({
  selector: 'app-resource-type',
  templateUrl: './resource-type.component.html',
  styleUrls: ['./resource-type.component.css'],
})
export class ResourceTypeComponent {
  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();

  constructor(private breakpointObserver: BreakpointService) {}
}
