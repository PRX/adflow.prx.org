import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { CoreModule, JingleService } from './../core';
import { SharedModule, PodcastModel } from './../shared';
import { HomeComponent } from './home.component';
import { HomePodcastComponent } from './directives/home-podcast.component';
import { HomeCampaignComponent } from './directives/home-campaign.component';
import { makeModel } from '../../testing/helpers';

describe('HomeComponent', () => {
  let comp: HomeComponent;
  let fix: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeCampaignComponent,
        HomeComponent,
        HomePodcastComponent
      ],
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        {provide: JingleService, useValue: {
          podcasts: Observable.of([])
        }}
      ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(HomeComponent);
      comp = fix.componentInstance;
      fix.detectChanges();
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));


  it('should show spinner before loads', () => {
    expect(de.query(By.css('prx-spinner'))).toBeFalsy();

    comp.isLoaded = false;
    fix.detectChanges();
    expect(de.query(By.css('prx-spinner'))).not.toBeNull();
  });

  it('should show podcasts', () => {
    expect(de.query(By.css('spot-home-podcast'))).toBeNull();
    const podcast1 = makeModel(PodcastModel, {name: 'podcast-one'});
    comp.podcasts = [podcast1];
    fix.detectChanges();
    expect(de.query(By.css('spot-home-podcast'))).not.toBeNull();
  });
});
