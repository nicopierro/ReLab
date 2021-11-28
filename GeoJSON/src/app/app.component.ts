import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps'
import { GEOJSON, GeoFeatureCollection } from './models/geojson.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'server mappe';
  //Aggiungiamo latitudine e longitudine di un luogo
  center: google.maps.LatLngLiteral = { lat: 45.506738, lng: 9.190766 };
  geoJsonObject: GeoFeatureCollection;
  fillColor: string = "#FF0000";  //Colore delle zone catastali

  markerList: google.maps.MarkerOptions[];
  zoom = 9;

  constructor() {

    //Questi dati dovremmo scaricarli dal server, per ora li abbiamo copiati nel file     gojson.model.ts
    this.geoJsonObject = GEOJSON;
    console.log(this.geoJsonObject); //stampo l'oggetto geoJsonObject sulla console
    this.markerGenerator();
  }

  styleFunc = (feature: any) =>{
    console.log(feature)
    return ({
      clickable: false,
      fillColor: this.fillColor,
      strokeWeight: 1
    });
  }


  @ViewChild('mapRef') mapRef: GoogleMap;
  ngAfterViewInit() {
    this.mapRef.data.addGeoJson(this.geoJsonObject);
    this.mapRef.data.setStyle(this.styleFunc)
  }

  markerGenerator()
  {
    this.markerList =[
      {
        position : {
          lng : this.geoJsonObject.features[0].geometry.coordinates[0][0][0],
          lat : this.geoJsonObject.features[0].geometry.coordinates[0][0][1]
        },
        label: String(this.geoJsonObject.features[0].properties.id),
      },
      {
        position : {
          lng : this.geoJsonObject.features[1].geometry.coordinates[0][0][0],
          lat : this.geoJsonObject.features[1].geometry.coordinates[0][0][1]
        },
        label: String(this.geoJsonObject.features[1].properties.id),
      },
    ]

  }

}