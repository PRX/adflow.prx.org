import { Component } from '@angular/core';

@Component({
  selector: 'adflow-home',
  template: `<h1>Adflow: home</h1>
  `
})
export class HomeComponent {
  // eventually this will have Tabs+TabService (or whatever else we use because Tab uses BaseModel plus we have mobile requirements),
  //  but right now it does nothing but a place to point the router 
}
