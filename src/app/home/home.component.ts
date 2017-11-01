import { Component, OnInit } from '@angular/core';
import { JingleService, HalDoc } from '../core';

@Component({
  selector: 'adflow-home',
  styleUrls: ['home.component.css'],
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

  isLoaded = false;
  podcasts: HalDoc[];

  constructor(private jingle: JingleService) {}

  ngOnInit() {
    this.isLoaded = false;
    this.jingle.podcasts.subscribe(podcasts => {
      this.isLoaded = true;
      this.podcasts = podcasts;
    });
  }

}
