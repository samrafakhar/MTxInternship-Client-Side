import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserAccount } from '../model/account';
import { AccountServiceService } from '../service/account-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);

  selectedProducts: string[] = [];
  selectedBusiness: string[] = [];
  selectedProteins: string[] = [];

  accountTypes:Array<any>;
  statusTypes:Array<any>;
  businessTypes:Array<any>;
  proteinTypes:Array<any>;
  productList: string[] = [];
  beefList: string[] = [];
  seafoodList: string[] = [];
  poultryList: string[] = [];
  temp:Array<any>;
  temp2:Array<any>;
  flag=true;
  
  constructor(private _service:AccountServiceService, private _router:Router, private _activatedRoute:ActivatedRoute) { 
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
    this._service.viewAccount().subscribe(
      data=>{
      this.account=data;
      var arr=this.account.businessType.split(',')
      this.selectedBusiness=arr;
      var arr2=this.account.productType.split(',')
      this.selectedProducts=arr2;
      var arr3=this.account.proteinType.split(',')
      this.selectedProteins=arr3;
    },
    error=>console.log("error")
    );
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

  isChecked(str:string) {
    if(this.selectedBusinessString.includes(str))
        return true;
    else
        return false;
  }

  get selectedProteinsString () {
    console.log(this.account.proteinType=this.selectedProteins.toString());
    this.account.proteinType=this.selectedProteins.toString();
    return this.selectedProteins.toString();
  }

  get selectedProductsString () {
    this.account.productType=this.selectedProducts.toString();
    return this.selectedProducts.toString();
  }

  get selectedBusinessString () {
    this.account.businessType=this.selectedBusiness.toString();
    console.log(this.selectedBusiness);
    return this.selectedBusiness.toString();
  }

  toggleSelectedProducts (product: string, event) {
    (event) ?
      this.selectedProducts.push(product) :
      this.selectedProducts = this.selectedProducts.filter(d => d !== product);
  }

  toggleSelectedBusiness (business: string, event) {
    (event) ?
      this.selectedBusiness.push(business) :
      this.selectedBusiness = this.selectedBusiness.filter(d => d !== business);
  }

  toggleSelectedProteins (product: string, event) {
    console.log("enterrrrr");
    (event) ?
      this.selectedProteins.push(product) :
      this.selectedProteins = this.selectedProteins.filter(d => d !== product);
      console.log(this.account.proteinType);
      console.log(this.selectedProteins);
  }

  editAccount(){
    this._service.editAccountFromRemote(this.account).subscribe(
      data=>{
        console.log("response POSTED");
        this._router.navigate(['/userAccounts']);
      },
      error=>{
        console.log("error")
      }
    )
  }
}
