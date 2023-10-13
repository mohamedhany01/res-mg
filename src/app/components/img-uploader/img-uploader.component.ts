import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { addSettings, loadSettings } from 'src/app/store/actions/app.action';
import { AppSettings } from 'src/app/store/modules/app-settings.interface';
import { selectSettings } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-img-uploader',
  templateUrl: './img-uploader.component.html',
  styleUrls: ['./img-uploader.component.css'],
})
export class ImgUploaderComponent implements OnInit {
  loadedSettings: AppSettings | null = null;
  // updatedSupplierName: string | = '';

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectSettings).subscribe(settings => {
      if (settings) {
        this.loadedSettings = settings;
      }
    });
  }

  saveSettings() {
    const updatedSupplier = {
      ...this.loadedSettings!.supplier,
      name: 'Updated TODO',
    };

    const updatedSettings: AppSettings = {
      ...this.loadedSettings,
      supplier: updatedSupplier,
    };
    this.store.dispatch(addSettings({ settings: updatedSettings }));
  }
}
