import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
