import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http : HttpClient) { }

  public loadAllProducts():Observable<any>{
    return this._http.get<any>("http://localhost:9090/Products");
  }

}
