import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  viewUsers(){
    this._router.navigate(['/users']);
  }
  viewContacts(){
    this._router.navigate(['/contacts']);
  }
  viewAccounts(){
    this._router.navigate(['/accounts']);
  }
}
