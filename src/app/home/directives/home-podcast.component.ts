import { Component, Input, OnInit } from '@angular/core';
import { HalDoc } from '../../core';
import { PodcastModel } from '../../shared'; // CampaignModel too

@Component({
  selector: 'adflow-home-podcast',
  styleUrls: ['home-podcast.component.css'],
  template: `
  <header>
    <h1><a href="#">{{podcast.name}}</a></h1>
  </header>
  <div class="campaign-list" *ngIf="podcast.campaigns && podcast.campaigns.length">
    <adflow-home-campaign *ngFor="let c of podcast.campaigns" [campaign]="c"></adflow-home-campaign>
  </div>
  `
})

export class HomePodcastComponent { //implements OnInit {

  @Input() podcast: PodcastModel;

  // we should be able to get this all from podcast.campaigns once PodcastModel related() is working
  //campaigns: HalDoc[]; // TODO should change to Campaign Model

  // ngOnInit() {
  //   console.log(' in home podcast oninit')
  //   // this.loadCampaigns();
  // }

  // loadCampaigns() {
  //   // follow doc
  //   if (this.podcast.doc && this.podcast.doc.has('prx:campaigns')) {
  //     this.podcast.doc.followItems('prx:campaigns').subscribe(campaigns => {
  //       this.campaigns = campaigns;
  //     });
  //   }
  // }
}
