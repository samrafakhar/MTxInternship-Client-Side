import { Component, OnInit } from '@angular/core';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserAccount } from '../model/account';
import { Contact } from '../model/contact';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {

  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);

  contactAddress=new Address();
  contact=new Contact(this.contactAddress, this.account);
  constructor(private _service:ContactService, private _router:Router) { }

  logout(){this._router.navigate(['/logout']);}
  ngOnInit(): void {
    this._service.viewContact().subscribe(
      data=>{console.log("response received");
      this.contact=data;
    },
    error=>console.log("error")
    );
  }

  editContact(ID:string){
    console.log("edit contact called");
    localStorage.setItem('currentContactID',ID);
    this._router.navigate(['/userAccounts/viewAccount/'+localStorage.getItem("currentAccountID")+'/accountContacts/editContact',  ID]);
  }
}
