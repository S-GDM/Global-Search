import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { GlobalComponent } from './global.component';
import {GlobalComponent} from '../global/global.component'
import { FlatpickrModule } from 'angularx-flatpickr';
import 'flatpickr/dist/flatpickr.css';
@NgModule({
  imports: [
    CommonModule,SharedModule,FlatpickrModule.forRoot(),
  ],
  declarations: [GlobalComponent]
})
export class GlobalModule { }
