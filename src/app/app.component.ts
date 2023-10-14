import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { BreakpointService } from './services/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'res-mg';
  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();

  constructor(
    private titleService: Title,
    private breakpointObserver: BreakpointService
  ) {
    this.titleService.setTitle($localize`${this.title}`);
  }
}
