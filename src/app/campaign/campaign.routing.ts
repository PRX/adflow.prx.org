import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, DeactivateGuard } from 'ngx-prx-styleguide';

import { CampaignComponent } from './campaign.component';
// import { CampaignScriptComponent } from './directives/campaign-script.component';
// import { CampaignUploadComponent } from './directives/campaign-upload.component';

const campaignChildRoutes = [
  // { path: '',          component: CampaignScriptComponent },
  // { path: 'upload', component: CampaignUploadComponent }
];

export const campaignRoutes: Routes = [
  {
    path: 'campaign/:id',
    component: CampaignComponent,
    canActivate: [AuthGuard],
    canDeactivate: [DeactivateGuard],
    children: campaignChildRoutes
  }
];

export const campaignComponents: any[] = [
  CampaignComponent
  // CampaignScriptComponent,
  // CampaignUploadComponent
];

export const campaignProviders: any[] = [];

export const campaignRouting: ModuleWithProviders = RouterModule.forChild(campaignRoutes);
