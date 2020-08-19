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
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/Contacts/"+localStorage.getItem('currentAccountID'));
  }

  public viewAllContacts(n:any):Observable<any>{
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/PaginatedContacts/"+n);
  }

  public addContactFromRemote(contact: Contact):Observable<any>{
    console.log(contact.address.street1);
    console.log(contact.address.city);
    return this._http.post<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/"+localStorage.getItem('currentUserID')+"/addContact/"+localStorage.getItem('currentAccountID'),contact)
  }

  public viewContact():Observable<any>{
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/viewContact/"+localStorage.getItem('currentContactID'));
  }

  public editContactFromRemote(contact: Contact):Observable<any>{
    return this._http.put<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/"+localStorage.getItem('currentUserID')+"/"+localStorage.getItem('currentAccountID')+"/editContact/"+localStorage.getItem('currentContactID'), contact);
  }

  public deleteContact():Observable<any>{
    return this._http.delete<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/deleteContact/"+localStorage.getItem('currentContactID'));
  }
}
