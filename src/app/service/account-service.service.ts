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

  public viewPaginatedAccounts(n: any):Observable<any>{
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/Accounts/"+ n);
  }

  public viewAllAccounts():Observable<any>{
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/Accounts");
  }

  public addAccountFromRemote(account: UserAccount):Observable<any>{
    return this._http.post<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/addAccount/"+account.owner.userID,account)
  }

  public viewAccount():Observable<any>{
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/viewAccount/"+localStorage.getItem('currentAccountID'));
  }

  public editAccountFromRemote(account: UserAccount):Observable<any>{
    return this._http.put<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/"+account.owner.userID+"/editAccount/"+localStorage.getItem('currentAccountID'), account);
  }

  public deleteAccount():Observable<any>{
    console.log("deleted");
    return this._http.delete<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/deleteAccount/"+localStorage.getItem('currentAccountID'));
  }

  public cloneAccountFromRemote(account: UserAccount):Observable<any>{
    return this._http.post<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/cloneAccount/"+account.owner.userID,account)
  }

  public getAccountProteinTypes(ID:string):Observable<any>{
    console.log("called here");
    console.log("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/viewAccount/"+localStorage.getItem('currentAccountID')+"/ProteinTypes");
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/viewAccount/"+ID+"/ProteinTypes");
  }
}
