import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { MockHalDoc } from 'ngx-prx-styleguide';

import { CoreModule } from './../../core';
import { SharedModule } from './../../shared';
import { HomeCampaignComponent } from './home-campaign.component';

describe('HomeCampaignComponent', () => {
  let comp: HomeCampaignComponent;
  let fix: ComponentFixture<HomeCampaignComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeCampaignComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule
      ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(HomeCampaignComponent);
      comp = fix.componentInstance;
      comp.campaign = new MockHalDoc({
        start_date: new Date('11/30/2016'),
        end_date: new Date('12/31/2016'),
        approved: false
      });
      comp.sponsor = new MockHalDoc({name: 'Sponsor One'});
      fix.detectChanges();
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('should prominently show sponsor name', () => {
    const h1 = de.query(By.css('h2')).query(By.css('a'));
    expect(h1.nativeElement.textContent).toEqual('Sponsor One');
  });

  it('should show start, end, & due dates', () => {
    const start = de.query(By.css('.start'));
    expect(start.nativeElement.textContent).toEqual('11/30/16');
    const end = de.query(By.css('.end'));
    expect(end.nativeElement.textContent).toEqual('12/31/16');
    const due = de.query(By.css('.due'));
    expect(start.nativeElement.textContent).not.toBeNull();
  });

  it('should determine status of campaign from date and approval', () => {
    expect(comp.statusText).toEqual('past');

    const today = new Date();
    comp.campaign['start_date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
    comp.campaign['end_date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);
    comp.setStatus();
    expect(comp.statusText).toEqual('running');

    comp.campaign['start_date'] = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);
    comp.setStatus();
    expect(comp.statusText).toEqual('needs work');

    comp.campaign['approved'] = true;
    comp.setStatus();
    expect(comp.statusText).toEqual('ready');
  });
});
