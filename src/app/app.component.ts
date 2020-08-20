import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MTxInternship';
  constructor(private _router:Router){}
  ngOnInit(): void {
    localStorage.setItem("flag",'0');
    var check = localStorage.getItem('currentUserID');
    if(check==null || check==undefined)
    {
      this._router.navigate(['/login']);
    }
    }
}
