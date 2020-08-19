import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import { Router } from '@angular/router';
import { Address } from '../model/address';
import { User } from '../model/user';

@Component({
  selector: 'app-new-user',
  templateUrl: '../registration/registration.component.html',
  styleUrls: ['../registration/registration.component.css']
})
export class NewUserComponent implements OnInit {

  address=new Address();
  user=new User(this.address);
  msg='';
  constructor(private _service:RegistrationService, private _router:Router) { }

  registerUser(){
    this._service.registerUserFromRemote(this.user).subscribe(
      data=>{
        console.log("response received");
        console.log(this.user.firstName);
        console.log(this.user.lastName);
        console.log(this.user.address.city);
        console.log(this.user.address.street2);
        localStorage.setItem("flag",'1');
        this._router.navigate(['/users']);
      },
      error=>{
        console.log("error")
        this.msg="error";
      }
    )
  }

  ngOnInit(): void {
  }

}
