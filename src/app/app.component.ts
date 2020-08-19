import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MTxInternship';
  constructor(){}
  ngOnInit(): void {
    localStorage.setItem("flag",'0');
    }
}
