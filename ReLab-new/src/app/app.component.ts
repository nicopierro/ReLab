import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'server mappe';
  //Aggiungiamo latitudine e longitudine di un luogo
  center : any;
  position : any;
  label : string;
  label2 : string;
  position2: any;
  constructor()
  {
    this.center = {lat: 45.501504, lng: 9.187257};
    this.position = this.center;
    this.position2 = {lat: 45.506738, lng: 9.190766};
    this.label = "casa"
    this.label2 = "ciao";
  }

}