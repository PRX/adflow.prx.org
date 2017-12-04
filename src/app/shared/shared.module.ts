import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard, DeactivateGuard, UnauthGuard, FancyFormModule, HeroModule, ImageModule, ModalModule, SpinnerModule } from 'ngx-prx-styleguide';

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
    TimeAgoPipe,
    TimeFromNowPipe
  ],
  imports: [
    CommonModule,
    FancyFormModule,
    ImageModule,
    HeroModule,
    ModalModule,
    SpinnerModule
  ],
  providers: [
    AuthGuard,
    DeactivateGuard,
    UnauthGuard
  ]
})

export class SharedModule { }
