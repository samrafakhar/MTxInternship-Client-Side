import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';
import { SearchService } from '../service/search.service';
import { AccountServiceService } from '../service/account-service.service';
import { Address } from '../model/address';
import { User } from '../model/user';
import { UserAccount } from '../model/account';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
const nisPackage = require('D:/nodejs/MTxInternship-Frontend/package.json');

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css']
})
export class AllContactsComponent implements OnInit {

  constructor(private modalService: NgbModal, private accountservice:AccountServiceService, private searchservice:SearchService, private _service:ContactService, private _router:Router) { 
    this.appendItems(0, this.sum);
    if(localStorage.getItem("flag")=='1'){
      window.location.reload();
      localStorage.setItem("flag",'0');
    }
  }

  array = [];
  sum = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;
  nisVersion = nisPackage.dependencies['ngx-infinite-scroll'];

  contacts:Array<any>=[];
  tempcontacts:Array<any>=[];
  searchS:String;
  closeResult = '';
  searchaccount:String;

  n:  number =0;
  shippingAddress=new Address();
  billingAddress=new Address();
  address=new Address();
  user=new User(this.address);
  account=new UserAccount(this.user,this.shippingAddress,this.billingAddress);
  
  addItems(startIndex, endIndex) {
    this._service.viewAllContacts(this.sum).subscribe(

      data=>{

      for(let a of data){
          this.contacts.push(a);
      }
      console.log(data);
      

      this.tempcontacts=this.contacts;
      if(this.contacts != undefined)
        if(this.contacts.length===0)
        console.log("no records");
      console.log("showing contacts");
      console.log("response received");
      console.log(data);

    },
    error=>console.log("error")
    );
    this.array=this.contacts;
  }
  
  appendItems(startIndex, endIndex) {
    this.addItems(startIndex, endIndex);
  }

  onScrollDown () {
    console.log('scrolled down!!');

    // add another 20 items
    const start = this.sum;
    this.sum += 15;
    this.appendItems(start, this.sum);
    
    this.direction = 'down'
  }

  searchBox()
  {
    console.log(this.searchS);
    if(this.searchS==null || this.searchS==undefined)
      this.contacts=this.tempcontacts;
    this.searchservice.searchContacts(this.searchS, 0).subscribe(
      data=>{
        console.log(data);
        if(data.length===0){
          this.contacts=this.tempcontacts;
        }
        else{
          this.contacts=data;
        }
      },
      error=>{console.log("error")
      this.contacts=this.tempcontacts;
    }
    )
  }

  accounts:Array<any>;
  allAccounts:Array<any>;

  createContact(ID:string){
    localStorage.setItem('currentAccountID',ID);
    console.log(ID+ " ID set now adding to it lololol");
    this._router.navigate(['/contacts/'+ localStorage.getItem("currentAccountID")+'/accountContacts/addContact']);
  }

  viewContact(ID:string){
    localStorage.setItem('currentContactID',ID);
    this._router.navigate(['/contacts/viewContact', ID]);
  }

  deleteContact(ID:string){
    localStorage.setItem('currentContactID',ID);
    this._service.deleteContact().subscribe(
      data=>{console.log("deleted successfully");
      window.location.reload();
    },
    error=>console.log("error")
    );
  }

  editContact(ID:string){
    console.log("edit contact called");
    localStorage.setItem('currentContactID',ID);
    this._router.navigate(['/contacts/editContact',  ID]);
  }
 
  
  ngOnInit(): void {

      this.accountservice.viewAllAccounts().subscribe(
        data=>{
        this.accounts=data;
        this.allAccounts=data;
        if(this.accounts.length===0)
          console.log("no records");
        console.log("showing uer accounts");
        console.log("response received");
        console.log(data);

      },
      error=>console.log("error loading accounts")
      );
}

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
                
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

viewAccount(ID:string){
  console.log(ID);
  localStorage.setItem('currentAccountID', ID);
  this._router.navigate(['/accounts/viewAccount', ID]);

}

}
