import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import {User} from '../model/user'
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import{NgForm, FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import { Address } from '../model/address';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  address=new Address();
  user=new User(this.address);
  msg='';

  constructor(private _service:RegistrationService, private _router:Router) { 
    
  }

  ngOnInit(): void {
  }


  registerUser(){
    this._service.registerUserFromRemote(this.user).subscribe(
      data=>{
        console.log("response received");
        console.log(this.user.firstName);
        console.log(this.user.lastName);
        console.log(this.user.address.city);
        console.log(this.user.address.street2);
        this._router.navigate(['/login']);
      },
      error=>{
        console.log("error")
        this.msg="error";
      }
    )
  }
}
