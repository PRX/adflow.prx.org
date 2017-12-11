import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { RouterStub, ActivatedRouteStub } from '../../testing/stub.router';
import { ActivatedRoute, Router } from '@angular/router';

import { CampaignComponent } from './campaign.component';

import { MockHalService } from 'ngx-prx-styleguide';
import { JingleService, CoreModule } from '../core';
import { SharedModule } from '../shared';

import { stubPipe } from '../../testing';

let activatedRoute = new ActivatedRouteStub();
let router = new RouterStub();
let jingle = new MockHalService().root;
let mockCampaign = {
  id: 99,
  copy: 'my campaign',
  startDate: new Date(),
  endDate: new Date(),
}
jingle.mock('prx:campaign', mockCampaign)
      .mock('prx:sponsor', {name: 'Dogs Everywhere'});

let stubTimeAgoPipe = stubPipe('timeago');
let stubTimeFromNowPipe = stubPipe('timefromnow');

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
        SharedModule
      ],
      providers: [
        {provide: JingleService, useValue: jingle},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useValue: router}
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
    expect(comp.campaign.copy).toEqual('my campaign');
    const sponsorName = de.query(By.css('.hero-info')).query(By.css('h2'));
    expect(sponsorName.nativeElement.textContent).toEqual('Dogs Everywhere');
  });

});
