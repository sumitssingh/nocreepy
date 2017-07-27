import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  loading = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  constructor() { }

  ngOnInit() {
    this.dropdownList = [
      {"itemName":"Male"},
      {"itemName":"Female"},
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: true,
      text:"Select Gender",
      selectAllText:'Select All',
      unSelectAllText:'UnSelect All',
      enableSearchFilter: false,
      classes:"myclass custom-class"
    };
  }
  register() {
    console.log("desanf cweasnfkc ");
    this.loading = true;
    console.log(this.model);
  }
  onItemSelect(item:any){
    console.log(item);
    // console.log(this.selectedItems2);
  }
  OnItemDeSelect(item:any){
    console.log(item);
    // console.log(this.selectedItems2);
  }
  onSelectAll(items: any){
    console.log(items);
  }
  onDeSelectAll(items: any){
    console.log(items);
  }

}
