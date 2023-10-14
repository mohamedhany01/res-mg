import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BreakpointService } from '../services/breakpoint.service';
import { Observable, Subscription } from 'rxjs';
import { AppSettings } from '../store/modules/app-settings.interface';
import { Store } from '@ngrx/store';
import { selectSettings } from '../store/selectors/app.selector';
import { addSettings } from '../store/actions/app.action';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
})
export class UploaderComponent implements OnInit {
  uploadedImg: string | null;
  img: string;
  uploadForm!: FormGroup;

  isMedium$: Observable<boolean> = this.breakpoint.isViewportMedium();

  appSettings$: Observable<AppSettings>;
  appSettingsSubscription!: Subscription;

  constructor(
    private store: Store,
    private builder: FormBuilder,
    private breakpoint: BreakpointService
  ) {
    this.appSettings$ = this.store.select(selectSettings);

    this.uploadedImg = '';
    this.img = '';
  }

  ngOnInit(): void {
    this.uploadForm = this.builder.group(
      {
        uploadedImg: new FormControl(''),
      },
      {
        updateOn: 'submit',
      }
    );
  }

  changeImg() {
    const blob = this.uploadForm.value['uploadedImg'];

    this.img = `../../assets/avatars/${blob.name}`;
    console.log(this.img);
    this.store.dispatch(
      addSettings({
        settings: {
          supplier: {
            avatarUrl: this.img,
          },
        },
      })
    );
  }
}
