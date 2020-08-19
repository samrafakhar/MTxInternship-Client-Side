import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http : HttpClient) { }

  public searchAccount(name:String, n:Number):Observable<any>{
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/accounts/"+n+"/name/"+name);
  }
  public searchContacts(name:String, n:Number):Observable<any>{
    console.log(("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/contacts/"+n+"/name/"+name));
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/contacts/"+n+"/name/"+name);
  }
}
