import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { TabService } from 'ngx-prx-styleguide';
import { CampaignScriptComponent } from './campaign-script.component';
import { CampaignComponent } from '../campaign.component';
import { SharedModule, CampaignModel } from '../../shared';
import { makeModel } from '../../../testing/helpers';

describe('CampaignScriptComponent', () => {
  let comp: CampaignScriptComponent;
  let fix: ComponentFixture<CampaignScriptComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CampaignScriptComponent
      ],
      imports: [
        SharedModule
      ],
      providers: [
        TabService,
        CampaignComponent
      ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(CampaignScriptComponent);
      comp = fix.componentInstance;
      fix.detectChanges();
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('does not render until the campaign is loaded', () => {
    expect(de.query(By.css('prx-fancy-field'))).toBeNull();
    const sponsorMock = {name: 'Dog company'};
    comp.campaign = makeModel(CampaignModel, {copy: 'Dogs everywhere'}, null, {sponsor: sponsorMock});
    fix.detectChanges();
    expect(de.query(By.css('prx-fancy-field'))).not.toBeNull();
  });
})
