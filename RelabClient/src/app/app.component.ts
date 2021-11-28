import { HttpClient } from '@angular/common/http';
import { AfterViewInit, OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { GoogleMap, MapCircle } from '@angular/google-maps'
import { Observable } from 'rxjs';
import { GeoFeatureCollection } from '../models/geojson.model';
import { Ci_vettore } from 'src/models/ci_vettore.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'server mappe';
  //Variabile che conterrà i nostri oggetti GeoJson
  geoJsonObject: GeoFeatureCollection;
  //Observable per richiedere al server python i dati sul DB
  obsGeoData: Observable<GeoFeatureCollection>;
  // Centriamo la mappa
  center: google.maps.LatLngLiteral = { lat: 45.506738, lng: 9.190766 };
  zoom = 8;
  obsCiVett: Observable<Ci_vettore[]>; //Crea un observable per ricevere i vettori energetici
  markerList: google.maps.MarkerOptions[];
  media: google.maps.LatLngLiteral = { lat: 45.506738, lng: 9.190766 };
  circleCenter: google.maps.LatLng;
  circleOptions = {}

  //Otteniamo l'istanza del cerchio nella variabile circleRef
  @ViewChild(MapCircle) circleRef: MapCircle;


  constructor(public http: HttpClient) {
    //Facciamo iniettare il modulo HttpClient dal framework Angular (ricordati di importare la libreria)

  }

  //Metodo che scarica i dati nella variabile geoJsonObject
  prepareData = (data: GeoFeatureCollection) => {
    this.geoJsonObject = data
    console.log(this.geoJsonObject);
  }


  ngOnInit() {
    this.circleOptions = { fillColor: 'red', clickable: true, editable: true, radius: 200, visible: false }
  }

  //Questo metodo richiama la route sul server che recupera il foglio specificato nella casella di testo
  cambiaFoglio(foglio): boolean {
    let val = foglio.value; //Commenta qui
    this.obsCiVett = this.http.get<Ci_vettore[]>(`https://5000-kumquat-beetle-elqaf181.ws-eu17.gitpod.io/ci_vettore/${val}`);  //Commenta qui
    this.obsCiVett.subscribe(this.prepareCiVettData); //Commenta qui
    console.log(val);
    return false;
  }

  prepareCiVettData = (data: Ci_vettore[]) => {
    console.log(data); //Verifica di ricevere i vettori energetici
    this.markerList = []; //NB: markers va dichiarata tra le proprietà markers : Marker[]
    for (const iterator of data) { //Per ogni oggetto del vettore creo un Marker
      let m: google.maps.MarkerOptions =
      {
        position: new google.maps.LatLng(iterator.WGS84_X, iterator.WGS84_Y),
        icon: this.findImage(iterator.CI_VETTORE)
      }
      //Marker(iterator.WGS84_X,iterator.WGS84_Y,iterator.CI_VETTORE);
      this.markerList.push(m);
    }
    this.center = this.LatLngMedia(data);
  }

  LatLngMedia(data: Ci_vettore[]): google.maps.LatLngLiteral {
    let totaleLon = 0
    let totaleLat = 0
    data.forEach(element => {
      totaleLat += parseFloat(String(data['WGS84_X']));
      totaleLon += parseFloat(String(data['WGS84_Y']));
    });
    let mediaLat = totaleLat / data.length;
    let mediaLon = totaleLon / data.length;
    this.media = { lat: mediaLat, lng: mediaLon };
    return this.media
  }

  findImage(label: string): google.maps.Icon {
    if (label.includes("Gas")) {
      return { url: './assets/img/gas.ico', scaledSize: new google.maps.Size(32, 32) };
    }
    if (label.includes("elettrica")) {
      return { url: './assets/img/electricity.ico', scaledSize: new google.maps.Size(32, 32) };
    }
    //Se non viene riconosciuta nessuna etichetta ritorna l'icona undefined
    return { url: './assets/img/undefined.ico', scaledSize: new google.maps.Size(32, 32) }
  }

  //Aggiungi il gestore del metodo mapClicked
  mapClicked($event: google.maps.MapMouseEvent) {
    console.log($event);
    let coords = $event.latLng; //Queste sono le coordinate cliccate
    this.center = { lat: coords.lat(), lng: coords.lng() };
    this.circleRef.circle?.setVisible(true); //rendiamo visibile il cerchio
  }

  circleRightClicked($event: google.maps.MapMouseEvent) {
    console.log(this.circleRef.getRadius());
    console.log(this.circleRef.getCenter());
    this.circleRef.circle?.setVisible(false);
  }

}







