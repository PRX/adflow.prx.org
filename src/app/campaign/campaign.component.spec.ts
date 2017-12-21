import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { CampaignComponent } from './campaign.component';

import { MockHalService, TabModule } from 'ngx-prx-styleguide';
import { JingleService, CoreModule } from '../core';
import { SharedModule } from '../shared';

import { ActivatedRouteStub } from '../../testing/stub.router';
import { stubPipe } from '../../testing/helpers';

const activatedRoute = new ActivatedRouteStub();
const jingle = new MockHalService().root;

const mockCampaign = {
  id: 99,
  originalCopy: 'my campaign',
  startDate: new Date(),
  endDate: new Date(),
  dueDate: new Date(),
};
jingle.mock('prx:campaign', mockCampaign)
      .mock('prx:sponsor', {name: 'Dogs Everywhere'});

const stubTimeAgoPipe = stubPipe('timeago');
const stubTimeFromNowPipe = stubPipe('timefromnow');

describe('CampaignComponent', () => {
  let comp: CampaignComponent;
  let fix: ComponentFixture<CampaignComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CampaignComponent,
        stubTimeAgoPipe,
        stubTimeFromNowPipe
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        TabModule,
        SharedModule
      ],
      providers: [
        {provide: JingleService, useValue: jingle},
        {provide: ActivatedRoute, useValue: activatedRoute}
      ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(CampaignComponent);
      comp = fix.componentInstance;
      activatedRoute.testParams = {id: '100'};
      fix.detectChanges();
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));


  it('loads a campaign by id', () => {
    activatedRoute.testParams = {id: '99'};
    fix.detectChanges();
    expect(comp.campaign.id).toEqual(99);
    expect(comp.campaign.originalCopy).toEqual('my campaign');
    const sponsorName = de.query(By.css('.hero-info')).query(By.css('h2'));
    expect(sponsorName.nativeElement.textContent).toEqual('Dogs Everywhere');
  });

});
