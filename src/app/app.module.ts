import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SegmentVideoComponent } from './segment-video/segment-video.component';

import { ApiService } from "./_services/api.service";
import { Utils } from "./_helpers/utils";
import { VideoCompilationComponent } from './video-compilation/video-compilation.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SegmentVideoComponent,
    VideoCompilationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    Utils
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
