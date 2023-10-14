import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  isViewportMedium(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .pipe(
        map(
          results =>
            results.breakpoints[Breakpoints.Medium] ||
            results.breakpoints[Breakpoints.Small] ||
            results.breakpoints[Breakpoints.XSmall]
        )
      );
  }

  isExtraSmall(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(map(results => results.breakpoints[Breakpoints.XSmall]));
  }
}
