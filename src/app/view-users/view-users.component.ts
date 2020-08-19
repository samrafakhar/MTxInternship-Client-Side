import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../service/registration.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users:Array<any>;
  constructor(private _service:RegistrationService, private _router:Router) { }

  editUser(ID:string){
    console.log("edit contact called");
    localStorage.setItem('userID',ID);
    this._router.navigate(['/updateProfile']);
  }
 
  registerUser(){this._router.navigate(['/users/newUser']);}

  ngOnInit(): void {
    this._service.getAllUsers().subscribe(
      data=>{console.log("response received");
      this.users=data;
    },
    error=>console.log("error")
    );
  }

}
