import { Component, OnInit } from '@angular/core';
import {UserAccount} from '../model/account'
import { Address } from '../model/address';
import { AccountServiceService } from '../service/account-service.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {
  selectedProducts: string[] = [];
  selectedProteins: string[] = [];
  selectedBusiness: string[] = [];

  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);
  msg='';

  accountTypes:Array<any>;
  statusTypes:Array<any>;
  businessTypes:Array<any>;
  proteinTypes:Array<any>;
  productList: string[] = [];
  beefList: string[] = [];
  seafoodList: string[] = [];
  poultryList: string[] = [];

  temp:Array<any>;

  dropdownSettings:IDropdownSettings;

  constructor(private _service:AccountServiceService, private _router:Router) {
    this.accountTypes = ['Customer','Vendor']
    this.statusTypes = ['Active','Inactive']
    this.businessTypes=['Broker','Caterer','Cold Storage','Distributor','Freight','Packer','Processor','Rancher','Retailer','Trader', 'Wholesaler']

    this.temp=(JSON.parse(localStorage.getItem("products")));

    for(let result of this.temp){
      this.productList.push(result.productName);
    }
    
    for(let a of JSON.parse(localStorage.getItem("Seafood")))
      this.seafoodList.push(a.proteinName);
    for(let a of JSON.parse(localStorage.getItem("Poultary")))
      this.poultryList.push(a.proteinName);
    for(let a of JSON.parse(localStorage.getItem("Beef")))
      this.beefList.push(a.proteinName);
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  contains() {
    if(this.selectedBusinessString.includes("Broker")||
      this.selectedBusinessString.includes("Distributor")||
      this.selectedBusinessString.includes("Packer")||
      this.selectedBusinessString.includes("Processor")||
      this.selectedBusinessString.includes("Trader"))
        return true;
    else
        return false;
  }

  isSelected(name) {
    if(this.selectedProductsString.includes(name)){
      console.log("true");
      return true;
    }
    else{
      console.log("false");
        return false;
      }
  }

  onItemSelect(item: any) {
    this.selectedProteins.push(item);
    console.log(item);
    this.account.proteinType=this.selectedProteins.toString();
    console.log(this.account.proteinType);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  get selectedProductsString () {
    this.account.productType=this.selectedProducts.toString();
    return this.selectedProducts.toString();
  }

  get selectedProteinsString () {
    this.account.proteinType=this.selectedProteins.toString();
    return this.selectedProteins.toString();
  }

  get selectedBusinessString () {
    this.account.businessType=this.selectedBusiness.toString();
    return this.selectedBusiness.toString();
  }

  toggleSelectedProducts (product: string) {
    (this.selectedProducts.indexOf(product) === -1) ?
      this.selectedProducts.push(product) :
      this.selectedProducts = this.selectedProducts.filter(d => d !== product);

    //this.updateProteinList(product);
  }

  toggleSelectedProteins (product: string) {
    (this.selectedProteins.indexOf(product) === -1) ?
      this.selectedProteins.push(product) :
      this.selectedProteins = this.selectedProteins.filter(d => d !== product);
  }

  toggleSelectedBusiness (business: string) {
    (this.selectedBusiness.indexOf(business) === -1) ?
      this.selectedBusiness.push(business) :
      this.selectedBusiness = this.selectedBusiness.filter(d => d !== business);
  }

  addAccount(){
    this._service.addAccountFromRemote(this.account).subscribe(
      ()=>{
        console.log("response received");
        this._router.navigate(['/userAccounts']);
      },
      ()=>{
        console.log("error")
        this.msg="error";
      }
    )
  }

  /*updateProteinList(product)
  {
    if(this.productList.includes(product)){
    for(let a of JSON.parse(localStorage.getItem(product))){
      this.proteinList.push(a.proteinName);
    }
    }
    else{
      for(let a of JSON.parse(localStorage.getItem(product)))
        this.proteinList.filter(a.proteinName);
    }

    console.log("proteinlist");
    for(let a of this.proteinList){
      console.log(a);
    }
  }*/
   
}
