import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CampaignModel } from '../../shared';
import { TabService } from 'ngx-prx-styleguide';

@Component({
  template: `<h1>Script</h1>`
})

export class CampaignScriptComponent implements OnDestroy {

  campaign: CampaignModel;
  tabSub: Subscription;

  constructor(tab: TabService) {
    this.tabSub = tab.model.subscribe((c: CampaignModel) => {
      this.campaign = c;
    });
  }

  ngOnDestroy(): any {
    this.tabSub.unsubscribe();
  }

}
