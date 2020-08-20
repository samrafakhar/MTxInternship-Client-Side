import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProteinService {

  constructor(private _http : HttpClient) { }

  public loadAllProteins():Observable<any>{
    return this._http.get<any>("http://ec2-3-83-137-70.compute-1.amazonaws.com:9090/Proteins");
  }

  public loadAllProteinsByProduct(id:string):Observable<any>{
    return this._http.get<any>("http://ec2-3-83-137-70.compute-1.amazonaws.com:9090/ProteinsOfAProduct/"+id);
  }
}
