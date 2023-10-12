import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImgUploaderComponent } from './components/img-uploader/img-uploader.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ResourceOptionComponent } from './components/resource-option/resource-option.component';

@NgModule({
  declarations: [
    AppComponent,
    ImgUploaderComponent,
    ResourceTypeComponent,
    ResourceOptionComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
