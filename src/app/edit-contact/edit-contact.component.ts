import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserAccount } from '../model/account';
import { Contact } from '../model/contact';
import { ContactService } from '../service/contact.service';
import { AccountServiceService } from '../service/account-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  tradesForList: string[] = [];
  selectedTradesFor: string[] = [];
  functionalAreas:Array<any>;
  selectedFunctionalArea: string[] = [];
  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);

  contactAddress=new Address();
  contact=new Contact(this.contactAddress, this.account);
  
  constructor(private accountService:AccountServiceService, private _service:ContactService, private _router:Router) { 
    this.functionalAreas=[ "Accounts", "Buyer", "Customer Services", "Executive", "Finance", "Management", "Marketing", "Operations", "Owner", "Quality Assurance", "Sales"];
  }
  get selectedFunctionalAreaString () {
    this.contact.functionalArea=this.selectedFunctionalArea.toString();
    console.log(this.contact.functionalArea);
    return this.selectedFunctionalArea.toString();
  }

  toggleSelectedFunctionalAreas (functionalArea: string) {
    (this.selectedFunctionalArea.indexOf(functionalArea) === -1) ?
      this.selectedFunctionalArea.push(functionalArea) :
      this.selectedFunctionalArea = this.selectedFunctionalArea.filter(d => d !== functionalArea);
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUserID')==null || localStorage.getItem('currentUserID')==undefined)
    {
      this._router.navigate(['/login']);
    }
    this.getAccountProteinTypes();
    console.log("fetching for edit contact");
    this._service.viewContact().subscribe(
      data=>{console.log("response received");
      this.contact=data;
      var arr2=this.contact.functionalArea.split(',')
      this.selectedFunctionalArea=arr2;
      var arr3=this.contact.tradesFor.split(',')
      this.selectedTradesFor=arr3;
      console.log("data fetched");
    },
    error=>console.log("error")
    );
  } 
  updateContact(){
    console.log("now going to update");
    this._service.editContactFromRemote(this.contact).subscribe(
      data=>{
        localStorage.setItem("flag",'1');
        this._router.navigate(['/accounts/viewAccount/'+localStorage.getItem('currentAccountID')+'/accountContacts']);
      },
      error=>{
        console.log("error")
      }
    )
  }

  get selectedTradesForString () {
    this.contact.tradesFor=this.selectedTradesFor.toString();
    console.log(this.contact.tradesFor);
    return this.selectedTradesFor.toString();
  }

  toggleSelectedTradesFor(tradesfor: string) {
    (this.selectedTradesFor.indexOf(tradesfor) === -1) ?
      this.selectedTradesFor.push(tradesfor) :
      this.selectedTradesFor = this.selectedTradesFor.filter(d => d !== tradesfor);
  }
  
  getAccountProteinTypes()
  {
    this.accountService.viewAccount().subscribe(
      data=>{
        console.log(data.proteinType);
        console.log("response received");
        this.account=data;
        var arr=this.account.proteinType.split(',');
        this.tradesForList=arr;
        console.log(this.tradesForList);
      },
      error=>{
        console.log("error in tradesfor")
      }
    )
  }
}
