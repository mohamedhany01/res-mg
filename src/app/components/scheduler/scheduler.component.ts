import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
})
export class SchedulerComponent implements OnInit {
  schedulerForm!: FormGroup;
  loadedSettings: AppSettings | null = null;

  newSettings!: AppSettings;

  // Time slot array
  get multipleSlots() {
    return this.schedulerForm.get('multiple') as FormArray;
  }

  constructor(
    private builder: FormBuilder,
    private store: Store
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
