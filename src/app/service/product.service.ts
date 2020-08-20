import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http : HttpClient) { }

  public loadAllProducts():Observable<any>{
    return this._http.get<any>("http://ec2-3-83-137-70.compute-1.amazonaws.com:9090/Products");
  }

}
