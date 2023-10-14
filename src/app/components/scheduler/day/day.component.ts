import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { addSettings } from 'src/app/store/actions/app.action';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { Day } from 'src/app/store/modules/day.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit {
  schedulerForm!: FormGroup;
  appSettings$: Observable<AppSettings>;
  appSettingsSubscription!: Subscription;

  activeCheck: boolean | undefined;
  startDate: string | undefined;
  endData: string | undefined;
  nestedInputs: Day[] | undefined;

  @Input() name = '';
  @Input() index!: number;

  // Time slot array
  get multipleSlots() {
    return this.schedulerForm.get('multiple') as FormArray;
  }

  isMedium$: Observable<boolean> = this.breakpointObserver.isViewportMedium();
  isExtraSmall$: Observable<boolean> = this.breakpointObserver.isExtraSmall();

  constructor(
    private builder: FormBuilder,
    private store: Store,
    private breakpointObserver: BreakpointService
  ) {
    this.appSettings$ = this.store.select(selectSettings);
  }

  ngOnInit(): void {
    this.appSettings$.subscribe(settings => {
      this.activeCheck = settings.scheduler?.days?.at(this.index)?.active;
      this.startDate = settings.scheduler?.days?.at(this.index)?.startData;
      this.endData = settings.scheduler?.days?.at(this.index)?.endDate;
      this.nestedInputs = settings.scheduler?.days?.at(this.index)?.nested;
    });

    this.schedulerForm = this.builder.group({
      active: new FormControl(this.activeCheck),
      start: new FormControl(this.startDate),
      end: new FormControl(this.endData),
      multiple: this.builder.array([]),
    });
  }

  addExtraTimeSlot() {
    const newTimeSlot = this.builder.group({
      multipleStart: new FormControl(''),
      multipleEnd: new FormControl(''),
    });

    this.multipleSlots.push(newTimeSlot);
  }

  removeExtraTimeSlot(index: number) {
    this.multipleSlots.removeAt(index);
  }

  activeChanged(event: any) {
    this.activeCheck = event.checked;

    this.appSettings$.pipe(take(1)).subscribe(settings => {
      const currentDays = settings.scheduler?.days;

      // If currentDays is undefined, assign an empty array to updatedDays
      const updatedDays = currentDays ? [...currentDays] : [];

      // Create a new 'Day' object with the updated 'active' property
      if (updatedDays[this.index]) {
        updatedDays[this.index] = {
          ...updatedDays[this.index],
          active: this.activeCheck,
        };

        console.log(updatedDays);
      }

      // Create the updated settings
      const updatedSettings = {
        ...settings,
        scheduler: { ...settings.scheduler, days: updatedDays },
      };

      this.store.dispatch(addSettings({ settings: updatedSettings }));
    });
  }

  // Start date change
  startDateChanged(newStartDate: string) {
    this.updateSettings({ startData: newStartDate });
  }

  // End date change
  endDateChanged(newEndDate: string) {
    this.updateSettings({ endDate: newEndDate });
  }

  // Method to update the settings
  updateSettings(updatedProperties: Partial<Day>) {
    this.appSettings$.pipe(take(1)).subscribe(settings => {
      const currentDays = settings.scheduler?.days;

      // If currentDays is undefined, assign an empty array to updatedDays
      const updatedDays = currentDays ? [...currentDays] : [];

      if (updatedDays[this.index]) {
        // Merge the updated properties with the existing 'Day' object
        updatedDays[this.index] = {
          ...updatedDays[this.index],
          ...updatedProperties,
        };
      }

      // Create the updated settings
      const updatedSettings = {
        ...settings,
        scheduler: { ...settings.scheduler, days: updatedDays },
      };

      console.log(updatedSettings);

      this.store.dispatch(addSettings({ settings: updatedSettings }));
    });
  }
}
