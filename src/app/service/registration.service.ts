import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http : HttpClient) { }

  public loginUserFromRemote(user: User):Observable<any>{
    return this._http.post<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/login",user)
  }

  public registerUserFromRemote(user: User):Observable<any>{
    return this._http.post<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/register",user)
  }

  public updateFromRemote(user: User):Observable<any>{
    return this._http.put<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/updateUser/"+localStorage.getItem('UserID'), user)
  }

  public getAllUsers():Observable<any>{
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/Users")
  }
}
