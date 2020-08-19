
import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../service/account-service.service';
import { UserManagmentComponent } from '../user-managment/user-managment.component';
import {User} from '../model/user'
import {Address} from '../model/address'
import { Router } from '@angular/router';
import { UserAccount } from '../model/account';
import { SearchService } from '../service/search.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
const nisPackage = require('package.json');

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.css']
})
export class UserAccountsComponent implements OnInit {

  array = [];
  sum = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;
  nisVersion = nisPackage.dependencies['ngx-infinite-scroll'];

  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);
  searchString:String;
  accounts:Array<UserAccount>=[];
  allAccounts:Array<any>;

  firstName=localStorage.getItem('currentUserFirstName');
  lastName=localStorage.getItem('currentUserLastName');
  constructor(private modalService: NgbModal, private service:SearchService, private _service:AccountServiceService, private _router:Router) {
    
    console.log("constructor");
    if(localStorage.getItem("flag")=='1'){
      window.location.reload();
      localStorage.setItem("flag",'0');
    }
   }

   openVerticallyCentered(content, ID:string) {
    localStorage.setItem('currentAccountID', ID);
    this.modalService.open(content, { centered: true });
  }

   addItems(startIndex, endIndex) {
    this._service.viewPaginatedAccounts(this.sum).subscribe(

      data=>{

            for(let a of data){
              this.accounts.push(a);
         }
      this.allAccounts=this.accounts;
      if(this.accounts != undefined)
        if(this.accounts.length===0)
        console.log("no records");
      console.log("showing uer accounts");
      console.log("response received");
      console.log(data);

    },
    error=>console.log("error")
    );
    this.array=this.accounts;
  }
  
  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex);
  }

  onScrollDown () {
    console.log('scrolled down!!');

    // add another 20 items
    const start = this.sum;
    this.sum += 14;
    this.appendItems(start, this.sum);
    
    this.direction = 'down'
  }
  
  searchBox(event)
  {
      console.log(this.searchString);
      if(this.searchString==null || this.searchString==undefined){
        this.accounts=this.allAccounts;
      }
      this.service.searchAccount(this.searchString, 0).subscribe(
        data=>{
          if(data.length===0){
            this.accounts=this.allAccounts;
          }
          else{
            this.accounts=data;
          }
        },
        error=>{console.log("error")
        this.accounts=this.allAccounts;
      }
      )
  }

  createAccount(){
    this._router.navigate(['/accounts/addAccount']);
  }

  viewAccount(ID:string){
    console.log(ID);
    localStorage.setItem('currentAccountID', ID);
    this._router.navigate(['/accounts/viewAccount', ID]);

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
    this._router.navigate(['/accounts/editAccount', ID]);
  
  }
 

  /*public openConfirmationDialog(id) {
    this.confirmationDialogService.confirm('Deleting Account', 'Do you wish to proceed?')
    .then((confirmed) => this.deleteAccount(id));
    }*/

  ngOnInit(): void {
    console.log("ngonit");
    this._service.viewPaginatedAccounts(this.sum).subscribe(
      data=>{

            for(let a of data){
              this.accounts.push(a);
         }
      this.allAccounts=this.accounts;
      if(this.accounts != undefined)
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
