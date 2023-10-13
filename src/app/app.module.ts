import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImgUploaderComponent } from './components/img-uploader/img-uploader.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResourceOptionComponent } from './components/resource-option/resource-option.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { settingsReducer } from './store/reducers/app.reducer';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    ImgUploaderComponent,
    ResourceTypeComponent,
    ResourceOptionComponent,
    SchedulerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatRadioModule,
    StoreModule.forRoot({ settings: settingsReducer }, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
