import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ProductService} from './service/product.service'
import {ProteinService} from './service/protein.service'
import { AccountServiceService } from './service/account-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MTxInternship';

  products:Array<any>;
  proteins:Array<any>;
  proteinList: string[] = [];
  productList: string[] = [];

  constructor(private _service:ProductService, private service_:ProteinService, private _router:Router){}
  ngOnInit(): void {
      
    console.log("loading products");
    this._service.loadAllProducts().subscribe(
      data=>{

      localStorage.setItem("products", JSON.stringify(data));
      for(let result of data){
        console.log(result.productID);

        this.service_.loadAllProteinsByProduct(result.productId).subscribe(
          data=>{
            localStorage.setItem(result.proteinName, JSON.stringify(data));
          },
          error=>console.log("error")
        );
      }
    },
    error=>console.log("error")
    );

    for(let a of JSON.parse(localStorage.getItem("Seafood")))
      console.log(a.proteinName);
    for(let a of JSON.parse(localStorage.getItem("Poultary")))
        console.log(a.proteinName);
    for(let a of JSON.parse(localStorage.getItem("Beef")))
        console.log(a.proteinName);
}
}
