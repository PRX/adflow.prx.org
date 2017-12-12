import { Component, Input, OnInit } from '@angular/core';
import { HalDoc } from '../../core';
import { CampaignModel } from '../../shared';


@Component({
  selector: 'adflow-home-campaign',
  styleUrls: ['home-campaign.component.css'],
  template: `
    <article *ngIf="campaign && campaign.sponsor">
      <h2>
        <a [routerLink]="['campaign', campaign.id]">{{campaign.sponsor.name}}</a>
      </h2>
      <span class="run-dates">
        <p class="start">{{campaign.startDate | date:"MM/dd/yy"}}</p>
        <p>to</p>
        <p class="end">{{campaign.endDate | date:"MM/dd/yy"}}</p>
      </span>
      <p *ngIf="statusClass" [class]="statusClass">{{statusText}}</p>
      <p *ngIf="campaign.dueDate" class="due">Due: {{campaign.dueDate | date: shortDate}}</p>
    </article>
  `
})

export class HomeCampaignComponent implements OnInit {

  @Input() campaign: CampaignModel;
  statusText: string;
  statusClass: string;
  // sponsorImageDoc: HalDoc; TODO get images for sponsors

  ngOnInit() {
    this.setStatus();
  }

  setStatus() {
    const today = new Date();
    const startDate = new Date(this.campaign.startDate);
    const endDate = new Date(this.campaign.endDate);

    if (today < startDate && this.campaign.approved) {
      this.statusText = 'ready';
      this.statusClass = 'status ready';
    } else if (today < startDate && !this.campaign.approved) {
      this.statusText = 'needs work';
      this.statusClass = 'status draft';
    } else if (today > startDate && today > endDate) {
      this.statusText = 'past';
      this.statusClass = 'status past';
    } else if (today > startDate && today < endDate) {
      this.statusText = 'running';
      this.statusClass = 'status running';
    }
  }
}
