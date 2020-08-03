import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../model/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private _http : HttpClient) { }

  public viewAccountContacts():Observable<any>{
    return this._http.get<any>("http://localhost:9090/Contacts/"+localStorage.getItem('currentAccountID'));
  }

  public addContactFromRemote(contact: Contact):Observable<any>{
    console.log(contact.address.street1);
    console.log(contact.address.city);
    return this._http.post<any>("http://localhost:9090/"+localStorage.getItem('currentUserID')+"/addContact/"+localStorage.getItem('currentAccountID'),contact)
  }

  public viewContact():Observable<any>{
    return this._http.get<any>("http://localhost:9090/viewContact/"+localStorage.getItem('currentContactID'));
  }

  public editContactFromRemote(contact: Contact):Observable<any>{
    return this._http.put<any>("http://localhost:9090/"+localStorage.getItem('currentUserID')+"/"+localStorage.getItem('currentAccountID')+"/editContact/"+localStorage.getItem('currentContactID'), contact);
  }

  public deleteContact():Observable<any>{
    return this._http.delete<any>("http://localhost:9090/deleteContact/"+localStorage.getItem('currentContactID'));
  }
}
