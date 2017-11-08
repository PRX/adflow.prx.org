import { Component, Input } from '@angular/core';
import { PodcastModel } from '../../shared';

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

export class HomePodcastComponent {
  @Input() podcast: PodcastModel;
}
