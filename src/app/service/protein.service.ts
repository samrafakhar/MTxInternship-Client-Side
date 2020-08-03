import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProteinService {

  constructor(private _http : HttpClient) { }

  public loadAllProteins():Observable<any>{
    return this._http.get<any>("http://localhost:9090/Proteins");
  }

  public loadAllProteinsByProduct(id:string):Observable<any>{
    return this._http.get<any>("http://localhost:9090/ProteinsOfAProduct/"+id);
  }
}
