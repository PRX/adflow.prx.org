import { Component, Input } from '@angular/core';
import { HalDoc } from '../../core';

@Component({
  selector: 'adflow-home-podcast',
  styleUrls: ['home-podcast.component.css'],
  template: `<h1>{{podcast.name}}</h1>`
})

export class HomePodcastComponent {

  @Input() podcast: HalDoc;

  campaigns: HalDoc[]; //TODO should change to Campaign Model

}
