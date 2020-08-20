import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _http : HttpClient) { }

  public searchAccount(name:String, n:Number):Observable<any>{
    return this._http.get<any>("http://ec2-3-83-137-70.compute-1.amazonaws.com:9090/accounts/"+n+"/name/"+name);
  }
  public searchContacts(name:String, n:Number):Observable<any>{
    console.log(("http://ec2-3-83-137-70.compute-1.amazonaws.com:9090/contacts/"+n+"/name/"+name));
    return this._http.get<any>("http://ec2-3-83-137-70.compute-1.amazonaws.com:9090/contacts/"+n+"/name/"+name);
  }
}
