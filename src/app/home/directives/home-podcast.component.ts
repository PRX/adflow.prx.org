import { Component, Input, OnInit } from '@angular/core';
import { HalDoc } from '../../core';

@Component({
  selector: 'adflow-home-podcast',
  styleUrls: ['home-podcast.component.css'],
  template: `
  <h1>
    {{podcast.name}}
  </h1>
  <adflow-home-campaign *ngFor="let c of campaigns" [campaign]="c"></adflow-home-campaign>
  `
})

export class HomePodcastComponent implements OnInit {

  @Input() podcast: HalDoc;

  campaigns: HalDoc[]; //TODO should change to Campaign Model

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.podcast.followItems('prx:campaigns').subscribe(campaigns => {
      this.campaigns = campaigns;
    });
  }
}
