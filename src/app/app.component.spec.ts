import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { CoreModule, CmsService } from './core';

import { AuthModule, AuthService, ModalModule, MockHalService, MockHalDoc } from 'ngx-prx-styleguide';

import { SharedModule } from './shared';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let comp: AppComponent;
  let fix: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let auth;
  let cms;
  let authToken;
  let refreshToken;
  let cmsToken: string = null;

  beforeEach(async(() => {
    authToken = new Subject<string>();
    refreshToken = new Subject<boolean>();

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CoreModule,
        AuthModule,
        ModalModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        {provide: AuthService, useValue: {
          config: () => {},
          url: () => '',
          token: authToken,
          refresh: refreshToken
        }},
        {provide: CmsService, useValue: {
          auth: Observable.of(auth),
          setToken: token => cmsToken = token,
          account: new Subject<any>(),
          individualAccount: new Subject<any>()
        }}
      ]
    }).compileComponents().then(() => {
      fix = TestBed.createComponent(AppComponent);
      comp = fix.componentInstance;
      fix.detectChanges();
      de = fix.debugElement;
      el = de.nativeElement;
    });
  }));

  it('should create the app', async(() => {
    expect(comp).toBeTruthy();
  }));
  //
  // it(`should only show podcast choices when logged in`, async(() => {
  //   comp.loggedIn = true;
  //   fix.detectChanges();
  //   expect(de.query(By.css('adflow-home'))).not.toBeNull();
  //   comp.loggedIn = false;
  //   fix.detectChanges();
  //   expect(de.query(By.css('adflow-home'))).toBeNull();
  // }));

  it('should show user info when logged in', async(() => {
    comp.loggedIn = true;
    fix.detectChanges();
    expect(de.query(By.css('prx-navuser'))).toBeTruthy();
    comp.loggedIn = false;
    fix.detectChanges();
    expect(de.query(By.css('prx-navuser'))).toBeNull();
  }));
});
