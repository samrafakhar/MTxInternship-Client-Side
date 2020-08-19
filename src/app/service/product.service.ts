import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http : HttpClient) { }

  public loadAllProducts():Observable<any>{
    return this._http.get<any>("https://ec2-184-73-104-24.compute-1.amazonaws.com:9090/Products");
  }

}
