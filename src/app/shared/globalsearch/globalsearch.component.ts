
import { Component,Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener, ElementRef, ContentChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-globalsearch',
  templateUrl: './globalsearch.component.html',
  styleUrls: ['./globalsearch.component.css']
})
export class GlobalsearchComponent implements OnChanges {

    @Input() items: Object[] = new Array<Object>();
    @Input() selected: Object[] = new Array<Object>();
    @Input() options: ISearchOptions;
    //@Input() singleSelected: any = null;
    @Input() isHeaderDropdown: boolean;
    @Input() isReadonly: boolean;

    @Output() onSelect = new EventEmitter<any>();

    filteredItems: Object[] = new Array<Object>();

    @HostListener('document:click', ['$event'])
    
    clickout(event: any) {
        if (!this.isReadonly) {
            if (this.eRef.nativeElement.contains(event.target)) {
                this.options.showList = true;
            } else {
                this.options.showList = false;
            }
        }
    }

    constructor(private eRef: ElementRef) {

    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['items']) {
            this.assignCopy();
        }
        if (changes['options']) {
            this.options = {
                showList: this.options.showList ? this.options.showList : false,
                valueKey: this.options.valueKey ? this.options.valueKey : "value",
                textKey: this.options.textKey ? this.options.textKey : "text",
                source: this.options.source ? this.options.source : "remote",
                onAddItem: this.options.onAddItem ? this.options.onAddItem : false,
                onRemoveItem: this.options.onRemoveItem ? this.options.onRemoveItem : false,
                searchKey: this.options.searchKey ? this.options.searchKey : "",
                showSelected: this.options.showSelected === undefined ? true : this.options.showSelected,
              
            };
        }
    }

    assignCopy() {
        this.filteredItems = Object.assign([], this.items);
    }

    getActiveIndex(): number {
        var index: number = -1;
        for (var i = 0; i < this.filteredItems.length; i++) {
            if (this.filteredItems[i]["isDDActive"]) {
                return index = i;
            }
        }
        return index;
    }
    
    setActive(curActiveIndex: number, toActiveIndex: number) {
        if (this.filteredItems[toActiveIndex])
            this.filteredItems[curActiveIndex] ? this.filteredItems[curActiveIndex]['isDDActive'] = false : "";
        this.filteredItems[toActiveIndex] ? this.filteredItems[toActiveIndex]['isDDActive'] = true : "";
    }

    onClick(e: any) {
        if (!this.isReadonly) {
            var ele = e.currentTarget;
            this.options.showList = true;
            var value: string = ele.value; 

            var key = this.getArrowKeyDirection(e.keyCode);
            if (key == "up" || key == "left" || key == "down" || key == "right") {
                if (!this.options.showList) {
                    this.options.showList = true;
                }
                else if (key == "down" || key == "right") {
                    var activeIndex: number = this.getActiveIndex();
                    this.setActive(activeIndex, activeIndex + 1);
                }
                else {
                    var activeIndex: number = this.getActiveIndex();
                    this.setActive(activeIndex, activeIndex - 1);
                }

            }
            else if (key == "enter") {
                var activeIndex: number = this.getActiveIndex();
                if (activeIndex > -1) {
                    this.setActive(activeIndex, activeIndex + 1);
                    this.onClickSlected(e, this.filteredItems[activeIndex]);
                }
            }
            else if (this.options.source == "remote" && value.length > 1 && ((e.which <= 90 && e.which >= 48) || (e.which == 8 && value != "") || (e.which == 46 && value != ""))) {
                this.filteredItems = [];
                this.options.showList = true;
                this.onSelect.emit({ key: "search", value: value });
            }
            else if (!value) {
                if (this.options.source == "remote")
                    this.filteredItems = [];
                else
                    this.assignCopy(); //when nothing has typed
            }
            else {
                this.options.showList = true;
                var searchKey = this.options.searchKey ? this.options.searchKey : this.options.textKey;
                var textKey = this.options.textKey;
                var filterTextkeyItems: Object[] = new Array<Object>();
                if (textKey != searchKey && this.items && this.items.length > 0 && this.items[0].hasOwnProperty(textKey)) {
                    filterTextkeyItems = Object.assign([], this.items).filter(
                        item => item[textKey].toLowerCase().indexOf(value.toLowerCase()) > -1
                    )
                }
                var filteredItems = Object.assign([], this.items).filter(
                    item => item[searchKey].toLowerCase().indexOf(value.toLowerCase()) > -1
                )
                this.filteredItems = this.arrayUnique(filterTextkeyItems.concat(filteredItems));
            }
       }
    }



    arrayUnique(concatItems: Array<Object>) {
        var items = concatItems;
        for (var i = 0; i < items.length; ++i)
        {
            for (var j = i + 1; j < items.length; ++j)
            {
                if (items[i] === items[j])
                    items.splice(j--, 1);   
            }
        }

    return items;
    
    }

    getArrowKeyDirection(keyCode: any): any {
        return {
            37: 'left',
            39: 'right',
            38: 'up',
            40: 'down',
            13: 'enter'
        }[keyCode];
    }

    // sortArray(data: any) {
    //     var self = this;
    //     data = _.sortBy(data, function (item:any) {
    //         return item[self.options.textKey]
    //     });
    // }   

    isAvailable(filteredData: any, data: object): boolean {
        var condition = {};
        var field = this.options.valueKey;
        condition[field] = data[this.options.valueKey];
        let isAvailable:boolean = false;
        if(filteredData && filteredData.length>0){
         filteredData.filter(s => {
             if(s[field] == data[this.options.valueKey]){
                isAvailable = true;
             }
         });
        }

        return isAvailable;       
    }

    onClickSlected(e: any, selectedData: any) {
        e.preventDefault();
        // if (this.options.multiSelect) {            
        //     if (!this.isAvailable(this.selected, selectedData)) {
        //         var condition = {};
        //         var field = this.options.valueKey;
        //         condition[field] = selectedData[this.options.valueKey];
        //         if(!this.selected)
        //           this.selected = new Array<Object>();
        //        // var selectedItem = _.where(this.filteredItems, condition)[0];
        //         this.selected.push(selectedData);
        //         this.options.showList = false;
        //         //this.filteredItems = $.grep(this.filteredItems, function (item, i) {
        //         //    return item[self.options.valueKey] != selectedData[self.options.valueKey]
        //         //});
        //     }            
        //     //this.sortArray(this.selected);

        // }

        // else {
        //     this.singleSelected = selectedData;
        // }
        if (this.options.onAddItem && this.options.multiSelect)
            this.onSelect.emit({ key: "save", selected: this.selected, currentSelected: selectedData });
        else
            this.onSelect.emit({ key: "save", selected: selectedData });
        this.options.showList = false;
    }

    getSelected(condition:Object):any{
        this.selected.forEach((x)=>{
            if(x[this.options.valueKey] == condition[this.options.valueKey]){
                return x;
            }
        });
    }

    // removeSelected(data: any) {
    //     if (this.isReadonly) {
    //         var self = this;
    //         if (this.options.multiSelect) {
    //             this.options.showList = false;
    //             var condition = {};
    //             var field = this.options.valueKey;
    //             condition[field] = data[this.options.valueKey];
    //             var removedItem = this.getSelected(condition);
    //             this.selected = $.grep(this.selected, function (item, i) {
    //                 return item[self.options.valueKey] != data[self.options.valueKey]
    //             });
    //             if (!this.isAvailable(this.filteredItems, data))
    //                 this.filteredItems.push(removedItem);

    //         }
    //         else {
    //             if (this.options.source == "remote")
    //                 this.filteredItems = [];
    //             else
    //                 this.assignCopy();
    //             this.options.showList = true;
    //             //this.singleSelected = null;
    //         }
    //         if (this.options.onRemoveItem && this.options.multiSelect)
    //             this.onSelect.emit({ key: "save", selected: this.selected, removed: data });
    //         else
    //             this.onSelect.emit({ key: "save", selected: null, removed: data });
    //     }
    // }

    // dataToggleddlCon() {
    //     this.options.showList = !this.options.showList;
    // }
}
export interface ISearchOptions {

    showList?: boolean;
    valueKey?: string;
    textKey?: string;
    searchKey?: string;
    multiSelect?: boolean;
    source?: string;
    onAddItem?: any;
    onRemoveItem?: any;
    searchFor?: string;
    isTemplate?: boolean;
    /** This shows the selected items in top. If not required make it to false. Default is true. */
    showSelected?: boolean;
}

