import { Component, Input, OnInit } from '@angular/core';
import { HalDoc } from '../../core';

@Component({
  selector: 'adflow-home-campaign',
  styleUrls: ['home-campaign.component.css'],
  template: `
  <h1>
    {{sponsor.name}}
    {{campaign.start_date}} - {{campaign.end_date}}
  </h1>
  `
})

export class HomeCampaignComponent implements OnInit {

  @Input() campaign: HalDoc;
  sponsor: HalDoc; //TODO should change to Sponsor Model

  ngOnInit() {
    this.loadSponsor();
  }

  loadSponsor() {
    this.campaign.follow('prx:sponsor').subscribe(sponsor => {
      this.sponsor = sponsor;
    })
  }
}
