import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserAccount } from '../model/account';
import { AccountServiceService } from '../service/account-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ProteinService } from '../service/protein.service';
import { RegistrationService } from '../service/registration.service';

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
  selectedUser: any;

  accountTypes:Array<any>;
  statusTypes:Array<any>;
  businessTypes:Array<any>;
  proteinTypes:Array<any>;
  usersList:Array<any>;
  productList: string[] = [];
  beefList: string[] = [];
  seafoodList: string[] = [];
  poultryList: string[] = [];
  temp:Array<any>;
  temp2:Array<any>;
  flag=true;
 
  constructor(private regService:RegistrationService, private productservice:ProductService, private proteinservice:ProteinService, private _service:AccountServiceService, private _router:Router, private _activatedRoute:ActivatedRoute) { 
    this.accountTypes = ['Customer','Vendor']
    this.statusTypes = ['Active','Inactive']
    this.businessTypes=['Broker','Caterer','Cold Storage','Distributor','Freight','Packer','Processor','Rancher','Retailer','Trader', 'Wholesaler']
    this.loadProteinAndProduct();
  }

  
  ngOnInit(): void {
    if(localStorage.getItem('currentUserID')==null || localStorage.getItem('currentUserID')==undefined)
    {
      this._router.navigate(['/login']);
    }
    
    this.loadUsers();

    this._service.viewAccount().subscribe(
      data=>{
      this.account=data;
      if(this.account.businessType!=null){
      var arr=this.account.businessType.split(',')
      this.selectedBusiness=arr;
      this.selectedUser=this.account.owner.userID;

      }
      if(this.account.productType!=null){
      var arr2=this.account.productType.split(',')
      this.selectedProducts=arr2;
      }
      if(this.account.proteinType!=null){
      var arr3=this.account.proteinType.split(',')
      this.selectedProteins=arr3;
      }

      if( this.selectedBusiness==null){
        console.log(this.selectedBusiness);
        this.selectedBusiness=[" "];
        console.log(this.selectedBusiness);
      }
      if( this.selectedProducts==null){
        console.log(this.selectedProducts);
        this.selectedProducts=[" "];
        console.log(this.selectedProducts);
      }
      if( this.selectedProteins==null){
        console.log(this.selectedProteins);
        this.selectedProteins=[" "];
        console.log(this.selectedProteins);
      }
    },
    error=>console.log("error")
    );
  }
 
  loadProteinAndProduct()
  {
    this.productservice.loadAllProducts().subscribe(
      data=>{
        for(let a of data)
          this.productList.push(a.productName);
        console.log(this.productList);
      }
    )

    this.proteinservice.loadAllProteinsByProduct("Beef").subscribe(
      data=>{
        for(let a of data)
          this.beefList.push(a);
        console.log(this.beefList);
      }
    )

    this.proteinservice.loadAllProteinsByProduct("Poultry").subscribe(
      data=>{
        for(let a of data)
          this.poultryList.push(a);
        console.log(this.poultryList);
      }
    )

    this.proteinservice.loadAllProteinsByProduct("Seafood").subscribe(
      data=>{
        for(let a of data)
          this.seafoodList.push(a);
        console.log(this.seafoodList);
      }
    )


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

      return true;
    }
    else{
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

    this.account.proteinType=this.selectedProteins.toString();
    return this.selectedProteins.toString();
  }

  get selectedProductsString () {
    this.account.productType=this.selectedProducts.toString();
    return this.selectedProducts.toString();
  }

  get selectedBusinessString () {
    this.account.businessType=this.selectedBusiness.toString();
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
  }

  loadUsers(){
    this.regService.getAllUsers().subscribe(
      data=>{
        this.usersList=data;
        for(let a of this.usersList)
          console.log(a.userID);
        console.log("users");
        console.log(this.usersList);
      },
      error=>{
        console.log("error")
      }
    )
  }

  editAccount(){
    this.account.owner.userID=this.selectedUser;
    console.log(this.selectedUser);
    console.log("sending ths id to edit");
    console.log(this.account.owner.userID);
    this._service.editAccountFromRemote(this.account).subscribe(
      data=>{
        console.log("response POSTED");
        localStorage.setItem("flag",'1');
        this._router.navigate(['/accounts']);
      },
      error=>{
        console.log("error")
      }
    )
  }
}
