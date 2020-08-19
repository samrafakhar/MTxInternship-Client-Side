import { Injectable } from '@angular/core';
import { UserAccount } from '../model/account';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EsAccountService {

  constructor(private _http : HttpClient) { }

  public indexAccount(account: UserAccount):Observable<any>{
    return this._http.post<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/accounts/save",account)
  }
}
