import { FlatpickrModule } from 'angularx-flatpickr';
import { GlobalComponent } from './global/global.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//import { GlobalsearchComponent } from './Shared/globalsearch/globalsearch.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from './shared/shared.module';
import 'flatpickr/dist/flatpickr.css';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AppComponent,
   GlobalComponent,
    //GlobalsearchComponent,
   
   
  ],
  imports: [
    BrowserModule,AgGridModule.withComponents([]),SharedModule,FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
