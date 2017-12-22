import { Component, Input } from '@angular/core';
import { PodcastModel } from '../../shared';

@Component({
  selector: 'spot-home-podcast',
  styleUrls: ['home-podcast.component.css'],
  template: `
  <header>
    <h1><a href="#">{{podcast.name}}</a></h1>
  </header>
  <div class="campaign-list" *ngIf="podcast.campaigns && podcast.campaigns.length">
    <spot-home-campaign *ngFor="let c of podcast.campaigns" [campaign]="c"></spot-home-campaign>
  </div>
  `
})

export class HomePodcastComponent {
  @Input() podcast: PodcastModel;
}
