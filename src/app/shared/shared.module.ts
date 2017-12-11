import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard, DeactivateGuard, UnauthGuard, FancyFormModule, HeroModule, ImageModule, ModalModule, SpinnerModule, TabModule } from 'ngx-prx-styleguide';

import { TimeAgoPipe } from './date';
import { TimeFromNowPipe } from './date';

@NgModule({
  declarations: [
    TimeAgoPipe,
    TimeFromNowPipe
  ],
  exports: [
    CommonModule,
    FancyFormModule,
    ImageModule,
    HeroModule,
    ModalModule,
    SpinnerModule,
    TabModule,
    TimeAgoPipe,
    TimeFromNowPipe
  ],
  imports: [
    CommonModule,
    FancyFormModule,
    ImageModule,
    HeroModule,
    ModalModule,
    RouterModule,
    SpinnerModule,
    TabModule
  ],
  providers: [
    AuthGuard,
    DeactivateGuard,
    UnauthGuard
  ]
})

export class SharedModule { }
