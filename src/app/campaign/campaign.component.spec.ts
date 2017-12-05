import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';


// import { cit, create, cms, provide, stubPipe, By } from '../../testing';
import { RouterStub, ActivatedRouteStub } from '../../testing/stub.router';
import { matchers } from '../../testing/matchers';
import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { ModalService, ToastrService } from 'ngx-prx-styleguide';
//
import { MockHalDoc, MockHalService, TabService } from 'ngx-prx-styleguide';

import { CoreModule, JingleService } from './../core';
import { SharedModule, CampaignModel } from './../shared';
import { CampaignComponent } from './campaign.component';

let activatedRoute = new ActivatedRouteStub();
let router = new RouterStub();
let jingle = new MockHalService();
// class MockHalHttpError extends Error {
//   name = 'HalHttpError';
//   constructor(public status: number, msg: string) {
//     super(msg);
//   }
// }
//
describe('CampaignComponent', () => {
  //   create(SeriesComponent, false);
  //   provide(Router, router);
  //   provide(ActivatedRoute, activatedRoute);
  //   stubPipe('timeago');

  let comp: CampaignComponent;
  let fix: ComponentFixture<CampaignComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CampaignComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule.withRoutes(
          [{path: '', component: CampaignComponent}]
        ),
        SharedModule
      ],
      providers: [
        {provide: JingleService, useValue: jingle},
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: TabService, useValue: TabService}
      ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(CampaignComponent);
      comp = fix.componentInstance;
      fix.detectChanges();
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));


  it('loads a campaign by id', () => {
    activatedRoute.testParams = {id: '99'};
    jingle.mock('prx:campaign', {id: 99, name: 'my series title'}).mock('prx:sponsor', {name: 'Blue Apron'});
    fix.detectChanges();
    console.log(el);
    // expect(el).toContainText('Edit Campaign');
    // expect(el).toContainText('BlueApron');
    expect(comp.campaign.id).toEqual(99);
  });

//   it('pops error if series does not exist', () => {
//     auth.mockError('prx:campaign', new MockHalHttpError(404, 'Campaign does not exist.'));
//     comp.id = 100;
//     comp.loadCampaign();
//     expect(toastErrorMsg).toEqual('No series found. Redirecting to new series page');
//   });
//
});
