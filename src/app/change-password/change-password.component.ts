import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import {User} from '../model/user'
import { Address } from '../model/address';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ConfirmedValidator} from './ConfirmedValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup = new FormGroup({}); 
  address=new Address();
  user=new User(this.address);

  constructor(private fb: FormBuilder, private _service:RegistrationService, private _router:Router) {
    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, { 
      validator: ConfirmedValidator('password', 'confirm_password')
    })
   }

  ngOnInit(): void {
    if(localStorage.getItem('currentUserID')==null || localStorage.getItem('currentUserID')==undefined)
    {
      this._router.navigate(['/login']);
    }
  }

  get f(){
    return this.form.controls;
  }
   
  updatePassword(){
    this._service.updateFromRemote(this.user).subscribe(
      data=>{
        console.log("password updated")
      },
      error=>{
        console.log("error")
      }
    )
  }
}
