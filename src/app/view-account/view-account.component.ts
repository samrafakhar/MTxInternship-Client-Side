import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../service/account-service.service';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserAccount } from '../model/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent implements OnInit {

  constructor(private _service:AccountServiceService, private _router:Router) { }

  
  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);
  
  ngOnInit(): void {
    console.log("view acc called");
    this._service.viewAccount().subscribe(
      data=>{console.log("response received");
      this.account=data;
    },
    error=>console.log("error")
    );
  }
 
  cloneAccount(ID:string){
    localStorage.setItem('currentAccountID', ID);
    console.log("call goes from user account");
    this._service.cloneAccountFromRemote(this.account).subscribe(
      data=>{
        console.log("account cloned");
        this._router.navigate(['/userAccounts']);
      },
      error=>{
        console.log("error")
      }
    )
  }

  editAccount(ID:string){
    localStorage.setItem('currentAccountID', ID);
    console.log("editAccount calleddd");
    this._router.navigate(['/userAccounts/editAccount', ID]);
  }

  viewContacts(){
    this._router.navigate(['/userAccounts/viewAccount/'+localStorage.getItem('currentAccountID')+'/accountContacts']);
  }
}
