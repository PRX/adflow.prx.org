import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { FooterModule, HalModule, HeaderModule, ModalModule, ModalService } from 'ngx-prx-styleguide';

import { CmsService, JingleService } from './hal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpModule,
    HalModule,
    RouterModule
  ],
  exports: [
    FooterModule,
    HeaderModule,
    ModalModule
  ],
  providers: [
    CmsService,
    ModalService,
    JingleService
  ]
})

export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
