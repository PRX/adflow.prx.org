import { Component, Input } from '@angular/core';
import { HalDoc } from '../../core';

@Component({
  selector: 'adflow-home-campaign',
  styleUrls: ['home-campaign.component.css'],
  template: `
  <h1>
    {{campaign.start_date}}
  </h1>
  `
})

export class HomeCampaignComponent {

  @Input() campaign: HalDoc;

  campaigns: HalDoc[]; //TODO should change to Campaign Model

}
