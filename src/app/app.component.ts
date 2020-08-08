import { Component } from '@angular/core';
import { Satellite } from './satellite';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  constructor() {
    this.sourceList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
 
    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
 
          let fetchedSatellites = data.satellites;
          let i = 0
          for(i = 0; i < fetchedSatellites.length; i++){ 
          // TODO: loop over satellites
          let satelliteObject = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
          // TODO: create a Satellite object using new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);\
          this.sourceList.push(satelliteObject)
          // TODO: add the new Satellite object to sourceList using: this.sourceList.push(satellite);
          }
          this.displayList = this.sourceList.slice(0);
         }.bind(this));
      }.bind(this));
    
 }
 search(searchTerm: string): void {
   let matchingSatellites: Satellite[] = [];
   searchTerm = searchTerm.toLowerCase();
   for(let i=0; i < this.sourceList.length; i++) {
      let name = this.sourceList[i].name.toLowerCase();
      if (name.indexOf(searchTerm) >= 0) {
         matchingSatellites.push(this.sourceList[i]);
      }
   }
   // assign this.displayList to be the array of matching satellites
   // this will cause Angular to re-make the table, but now only containing matches
   this.displayList = matchingSatellites;
   
   }
   displayList: Satellite[];
}
