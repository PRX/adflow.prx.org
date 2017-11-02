import { Component, Input, OnInit } from '@angular/core';
import { HalDoc } from '../../core';

@Component({
  selector: 'adflow-home-campaign',
  styleUrls: ['home-campaign.component.css'],
  template: `
    <article *ngIf="campaign && sponsor">
      <h2>
        <a [routerLink]="editLink">{{sponsor.name}}</a>
      </h2>
      <span class="run-dates">
        <p class="start">{{campaign.start_date | date:"MM/dd/yy"}}</p>
        <p>to</p>
        <p class="end">{{campaign.end_date | date:"MM/dd/yy"}}</p>
      </span>
      <p *ngIf="statusClass" [class]="statusClass">{{statusText}}</p>
      <p *ngIf="dueDate" class="due">Due: {{dueDate | date:"MM/dd"}}</p>
    </article>
  `
})

export class HomeCampaignComponent implements OnInit {

  @Input() campaign: HalDoc;
  sponsor: HalDoc; //TODO should change to Sponsor Model
  statusText: string;
  statusClass: string;
  dueDate: Date = new Date(); // TODO add due date to jingle campaigns
  // sponsorImageDoc: HalDoc; TODO get images for sponsors

  ngOnInit() {
    this.loadSponsor(); // TODO could just have name in Jingle response? or do we want full sponsor here?
    this.setStatus();
  }

  loadSponsor() {
    this.campaign.follow('prx:sponsor').subscribe(sponsor => {
      this.sponsor = sponsor;
    })
  }

  setStatus() {
    const today = new Date();
    const startDate = new Date(this.campaign['start_date']);
    const endDate = new Date(this.campaign['end_date']);

    // note, currently there is no 'approved' -- TODO add approval to jingle campaigns
    if (today < startDate && this.campaign['approved']) {
      this.statusText = "ready"
      this.statusClass = 'status ready';
    } else if (today < startDate && !this.campaign['approved']){
      this.statusText = "needs work"
      this.statusClass = 'status draft';
    } else if (today > startDate && today > endDate) {
      this.statusText = "past"
      this.statusClass = 'status past';
    } else if (today > startDate && today < endDate) {
      this.statusText = "running"
      this.statusClass = 'status running';
    }
  }
}
