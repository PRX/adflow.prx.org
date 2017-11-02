import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { MockHalDoc } from 'ngx-prx-styleguide';

import { CoreModule } from './../../core';
import { SharedModule } from './../../shared';
import { HomePodcastComponent } from './home-podcast.component';
import { HomeCampaignComponent } from './home-campaign.component';

describe('HomePodcastComponent', () => {
  let comp: HomePodcastComponent;
  let fix: ComponentFixture<HomePodcastComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeCampaignComponent,
        HomePodcastComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule
      ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(HomePodcastComponent);
      comp = fix.componentInstance;
      comp.podcast = new MockHalDoc({name: 'Podcast One'});
      fix.detectChanges();
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('should prominently show podcast name', () => {
    let h1 = de.query(By.css('h1')).query(By.css('a'));
    expect(h1.nativeElement.textContent).toEqual('Podcast One');
  });

  it('should show campaigns for podcast', () => {
    expect(de.query(By.css('adflow-home-campaign'))).toBeNull();
    let campaign1 = new MockHalDoc({name: 'one'});
    comp.campaigns = [campaign1];
    fix.detectChanges();
    expect(de.query(By.css('adflow-home-campaign'))).not.toBeNull();
  })
});
