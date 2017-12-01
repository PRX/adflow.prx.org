import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared';
import { TabModule } from 'ngx-prx-styleguide';
import { campaignRouting, campaignProviders, campaignComponents } from './campaign.routing';

@NgModule({
  declarations: [
    ...campaignComponents
  ],
  imports: [
    CommonModule,
    SharedModule,
    TabModule,
    campaignRouting
  ],
  providers: [
    ...campaignProviders
  ]
})

export class CampaignModule { }
