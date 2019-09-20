import { Component, OnInit } from '@angular/core';
//import {GlobalSearch} from '../../../shared/models/GlobalSearch';
//import {ISearchOptions} from '../../../shared/globalsearch/globalsearch.component';
import {ISearchOptions} from '../shared/globalsearch/globalsearch.component'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  constructor() { }
  clientOptions: ISearchOptions = { source: "remote", textKey: "name", 
    valueKey: "id", searchFor: "Client", onAddItem:true };

  ngOnInit() {
  }
  ResetSearchForm(GlobalSearchForm:NgForm){
    GlobalSearchForm.resetForm();
  }
}
