import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-contacts',
  templateUrl: './account-contacts.component.html',
  styleUrls: ['./account-contacts.component.css']
})
export class AccountContactsComponent implements OnInit {

  constructor(private _service:ContactService, private _router:Router) {
    if(localStorage.getItem("flag")=='1'){
      window.location.reload();
      localStorage.setItem("flag",'0');
    }
   }

  accountName:String=localStorage.getItem("currentAccountName");
  contacts:Array<any>;

  createContact(){
    this._router.navigate(['/accounts/viewAccount/'+ localStorage.getItem("currentAccountID")+'/accountContacts/addContact']);
  }

  viewContact(ID:string){
    localStorage.setItem('currentContactID',ID);
    this._router.navigate(['/accounts/viewAccount/'+ localStorage.getItem("currentAccountID")+'/accountContacts/viewContact', ID]);
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
    this._router.navigate(['/accounts/viewAccount/'+localStorage.getItem("currentAccountID")+'/accountContacts/editContact',  ID]);
  }
 
  
  ngOnInit(): void {
 
    if(localStorage.getItem('currentUserID')==null || localStorage.getItem('currentUserID')==undefined)
    {
      this._router.navigate(['/login']);
    }

                    this._service.viewAccountContacts().subscribe(
                      data=>{console.log("response received");
                      this.contacts=data;
                    },
                    error=>console.log("error")
                    );
                  }

}
