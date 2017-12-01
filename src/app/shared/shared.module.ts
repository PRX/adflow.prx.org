import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard, DeactivateGuard, UnauthGuard, FancyFormModule, HeroModule, ImageModule, ModalModule, SpinnerModule } from 'ngx-prx-styleguide';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FancyFormModule,
    ImageModule,
    HeroModule,
    ModalModule,
    SpinnerModule
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
