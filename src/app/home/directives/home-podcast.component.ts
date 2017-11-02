import { Component, Input, OnInit } from '@angular/core';
import { HalDoc } from '../../core';

@Component({
  selector: 'adflow-home-podcast',
  styleUrls: ['home-podcast.component.css'],
  template: `
  <header>
    <h1><a href="#">{{podcast.name}}</a></h1>
  </header>
  <div class="campaign-list" *ngIf="campaigns && campaigns.length">
    <adflow-home-campaign *ngFor="let c of campaigns" [campaign]="c"></adflow-home-campaign>
  </div>
  `
})

export class HomePodcastComponent implements OnInit {

  @Input() podcast: HalDoc;

  campaigns: HalDoc[]; // TODO should change to Campaign Model

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {
    if (this.podcast && this.podcast.has('prx:campaigns')) {
      this.podcast.followItems('prx:campaigns').subscribe(campaigns => {
        this.campaigns = campaigns;
      });
    }
  }
}
