import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserAccount } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  constructor(private _http : HttpClient) { }

  public viewUserAccounts():Observable<any>{
    return this._http.get<any>("http://localhost:9090/Accounts/"+localStorage.getItem('currentUserID'));
  }

  public addAccountFromRemote(account: UserAccount):Observable<any>{
    return this._http.post<any>("http://localhost:9090/addAccount/"+localStorage.getItem('currentUserID'),account)
  }

  public viewAccount():Observable<any>{
    return this._http.get<any>("http://localhost:9090/viewAccount/"+localStorage.getItem('currentAccountID'));
  }

  public editAccountFromRemote(account: UserAccount):Observable<any>{
    return this._http.put<any>("http://localhost:9090/"+localStorage.getItem('currentUserID')+"/editAccount/"+localStorage.getItem('currentAccountID'), account);
  }

  public deleteAccount():Observable<any>{
    console.log("deleted");
    return this._http.delete<any>("http://localhost:9090/deleteAccount/"+localStorage.getItem('currentAccountID'));
  }

  public cloneAccountFromRemote(account: UserAccount):Observable<any>{
    return this._http.post<any>("http://localhost:9090/cloneAccount/"+localStorage.getItem('currentUserID'),account)
  }

  public getAccountProteinTypes(ID:string):Observable<any>{
    console.log("called here");
    console.log("http://localhost:9090/viewAccount/"+localStorage.getItem('currentAccountID')+"/ProteinTypes");
    return this._http.get<any>("http://localhost:9090/viewAccount/"+ID+"/ProteinTypes");
  }
}
