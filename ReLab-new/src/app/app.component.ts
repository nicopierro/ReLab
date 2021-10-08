import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'server mappe';

  // centro + coordinate marker
  center: any;
  position: any;
  position2: any;
  position3: any;
  position4: any;
  position5: any;

  // label marker
  label: string;
  label2: string;

  // opzioni cerchio e rettangolo
  circleOptions = { fillColor: 'string' }
  rectangleOptions = { fillColor: 'string' }

  // opzioni marker
  markerOptions: google.maps.MarkerOptions;
  markerOptions2: google.maps.MarkerOptions;
  markerOptions3: google.maps.MarkerOptions;
  markerOptions4: google.maps.MarkerOptions;

  // vertici triangolo
  vertices: google.maps.LatLngLiteral[]; 

  // vertici rettangolo
  vertices2: google.maps.LatLngLiteral[]; 

  constructor() {

    // coordinate
    this.position = { lat: 45.501504, lng: 9.187257 }; // casa
    this.position2 = { lat: 45.506738, lng: 9.190766 } // scuola
    this.position3 = { lat: 45.507100, lng: 9.190766 }; // cane
    this.position4 = { lat: 45.506738, lng: 9.190100 }; // uccello
    this.position5 = { lat: 45.506738, lng: 9.191400 }; // criceto
    this.center = this.position2;

    // label
    this.label = "casa"
    this.label2 = "ciao";

    // opzioni cerchio e rettangolo
    this.circleOptions = { fillColor: 'red' }
    this.rectangleOptions = { fillColor: 'black' }

    // icona gatto
    let iconData: google.maps.Icon = {
      url: './assets/img/cat_acrobat.ico',
      scaledSize: new google.maps.Size(60, 60)
    }

    // icona cane
    let iconData2: google.maps.Icon = {
      url: './assets/img/dog.ico',
      scaledSize: new google.maps.Size(60, 60)
    }


    // icona uccello
    let iconData3: google.maps.Icon = {
      url: './assets/img/bird.ico',
      scaledSize: new google.maps.Size(60, 60)
    }

    // icona criceto
    let iconData4: google.maps.Icon = {
      url: './assets/img/hamster.ico',
      scaledSize: new google.maps.Size(60, 60)
    }

    // markerOptions dei marker
    this.markerOptions = { icon: iconData }
    this.markerOptions2 = { icon: iconData2 }
    this.markerOptions3 = { icon: iconData3 }
    this.markerOptions4 = { icon: iconData4 }

    // vertici triangolo
    this.vertices = [
      { lat: this.center.lat + 0.001, lng: this.center.lng - 0.002 },
      { lat: this.center.lat, lng: this.center.lng },
      { lat: this.center.lat - 0.001, lng: this.center.lng - 0.002 }
    ];

    // vertici rettangolo
    this.vertices2 = [
      { lat: this.center.lat - 0.001, lng: this.center.lng + 0.002 },
      { lat: this.center.lat + 0.001, lng: this.center.lng + 0.002 },
      { lat: this.center.lat + 0.001, lng: this.center.lng },
      { lat: this.center.lat - 0.001, lng: this.center.lng }
    ];

  }

  // metodi per i colori del cerchio
  redCircle() {
    this.circleOptions = { fillColor: 'red' }
  }

  yellowCircle() {
    this.circleOptions = { fillColor: 'yellow' }
  }

  greenCircle() {
    this.circleOptions = { fillColor: 'green' }
  }

  // metodi per i colori del rettangolo
  redRectangle() {
    this.rectangleOptions = { fillColor: 'red' }
  }

  yellowRectangle() {
    this.rectangleOptions = { fillColor: 'yellow' }
  }

  greenRectangle() {
    this.rectangleOptions = { fillColor: 'green' }
  }


}