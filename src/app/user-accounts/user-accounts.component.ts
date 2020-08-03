import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../service/account-service.service';
import { UserManagmentComponent } from '../user-managment/user-managment.component';
import {User} from '../model/user'
import {Address} from '../model/address'
import { Router } from '@angular/router';
import { UserAccount } from '../model/account';
//import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {

  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);

  firstName=localStorage.getItem('currentUserFirstName');
  lastName=localStorage.getItem('currentUserLastName');
  constructor( private _service:AccountServiceService, private _router:Router) { }
//private confirmationDialogService: ConfirmationDialogService,

  accounts:Array<any>;

  createAccount(){
    this._router.navigate(['/userAccounts/addAccount']);
  }

  viewAccount(ID:string){
    console.log(ID);
    localStorage.setItem('currentAccountID', ID);
    this._router.navigate(['/userAccounts/viewAccount', ID]);
  }

  deleteAccount(ID:string){
    localStorage.setItem('currentAccountID', ID);
    this._service.deleteAccount().subscribe(
      data=>{console.log("deleted successfully");
      window.location.reload();
    },
    error=>console.log("error")
    );
  }

  editAccount(ID:string){
    console.log(ID);
    console.log(this.account.businessType);
    localStorage.setItem('currentAccountID', ID);
    console.log("editAccount calleddd");
    this._router.navigate(['/userAccounts/editAccount', ID]);
  }
 

  /*public openConfirmationDialog(id) {
    this.confirmationDialogService.confirm('Deleting Account', 'Do you wish to proceed?')
    .then((confirmed) => this.deleteAccount(id));
    }*/

  ngOnInit(): void {
    
                    this._service.viewUserAccounts().subscribe(
                      
                      data=>{

                      this.accounts=data;
                      if(this.accounts.length===0)
                        console.log("no records");
                      console.log("showing uer accounts");
                      console.log("response received");
                      console.log(data);

                    },
                    error=>console.log("error")
                    );
                  }

  

}
