import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/services/breakpoint.service';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css'],
})
export class DayComponent implements OnInit {
  schedulerForm!: FormGroup;
  loadedSettings: AppSettings | null = null;

  newSettings!: AppSettings;

  @Input() name = '';

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
  ) {}

  ngOnInit(): void {
    this.schedulerForm = this.builder.group({
      active: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl(''),
      multiple: this.builder.array([]),
    });

    this.store.select(selectSettings).subscribe(settings => {
      this.schedulerForm.get('active')?.setValue(settings?.scheduler?.active);
      this.schedulerForm.get('start')?.setValue(settings?.scheduler?.startData);
      this.schedulerForm.get('end')?.setValue(settings?.scheduler?.endDate);
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
}
