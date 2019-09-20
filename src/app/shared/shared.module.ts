import { ButtonRenderComponent } from './components/button-render/button-render.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
//import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import {GlobalsearchComponent } from './globalsearch/globalsearch.component';
//import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

@NgModule({
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,RouterModule,],
 
  declarations: [EqualValidatorDirective,GlobalsearchComponent,ButtonRenderComponent],
  exports:[EqualValidatorDirective,FormsModule,ReactiveFormsModule,RouterModule,CommonModule,GlobalsearchComponent,ButtonRenderComponent],
})
export class SharedModule { }
