import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard, DeactivateGuard, UnauthGuard, FancyFormModule, HeroModule, ImageModule, ModalModule, SpinnerModule } from 'ngx-prx-styleguide';

import { TimeAgoPipe } from './date';

@NgModule({
  declarations: [
    TimeAgoPipe
  ],
  exports: [
    CommonModule,
    FancyFormModule,
    ImageModule,
    HeroModule,
    ModalModule,
    SpinnerModule,
    TimeAgoPipe
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
