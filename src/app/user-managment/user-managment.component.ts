import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from '../service/account-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  constructor(private _service:AccountServiceService, private _router:Router) { }
 
  ngOnInit(): void {
  }
  
  logout(){this._router.navigate(['/logout']);}
  updateProfile(){this._router.navigate(['/updateProfile']);}
  changePassword(){
    console.log("change password"); 
    this._router.navigate(['/changePassword']);}
}
