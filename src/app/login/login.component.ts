import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import {User} from '../model/user'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Address } from '../model/address';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  address=new Address();
  user=new User(this.address);
  msg='';
  constructor(private _service:RegistrationService, private _router:Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    this._service.loginUserFromRemote(this.user).subscribe(
      data=>{
        localStorage.setItem('currentUserID',data.userID);
        localStorage.setItem('currentUserFirstName',data.firstName);
        localStorage.setItem('currentUserLastName',data.lastName);
        console.log(localStorage.getItem('currentUserID'));
        this._router.navigate(['/accounts']);
      },
      error=>{
        console.log("error")
        this.msg="error";
      }
    )
  }

  logout(){
    localStorage.setItem('currentAccountID', null);
    localStorage.setItem('currentContactID', null);
    localStorage.setItem('currentUserID', null);
    this._router.navigate(['/login']);
  }
  
  registerUser(){this._router.navigate(['/register']);}
}
