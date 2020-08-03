import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserAccount } from '../model/account';
import { ContactService } from '../service/contact.service';
import { AccountServiceService } from '../service/account-service.service';
import { Router } from '@angular/router';
import { Contact } from '../model/contact';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  functionalAreas:Array<any>;
  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);
  selectedFunctionalArea: string[] = [];
  tradesForList: string[] = [];
  selectedTradesFor: string[] = [];
  contactAddress=new Address();
  contact=new Contact(this.contactAddress, this.account);
  constructor(private _service:ContactService, private accountService:AccountServiceService, private _router:Router) { 
    this.functionalAreas=[ "Accounts", "Buyer", "Customer Services", "Executive", "Finance", "Management", "Marketing", "Operations", "Owner", "Quality Assurance", "Sales"];
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
    /*console.log(localStorage.getItem("currentAccountID"));
    console.log("loading tradesfor");
    this.accountService.getAccountProteinTypes(localStorage.getItem("currentAccountID")).subscribe(
  
      data=>{
        console.log(" tradesfor response reveiving");
        console.log(data);
        var arr=data.split(',')
        this.tradesForList=arr;
        console.log(this.tradesForList);
        console.log(" tradesfor response reveived");
    },
    error=>{console.log("error in tradesfor");
    console.log(this.tradesForList);}
    );*/
  }

  ngOnInit(): void {
    this.getAccountProteinTypes();
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
  addContact(){
    this._service.addContactFromRemote(this.contact).subscribe(
      data=>{
        console.log("response received");
        this._router.navigate(['/userAccounts/viewAccount/'+localStorage.getItem('currentAccountID')+'/accountContacts']);
      },
      error=>{
        console.log("error")
      }
    )
  }
}
