import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FooterModule, HalModule, HeaderModule, ModalModule, ModalService } from 'ngx-prx-styleguide';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpModule,
  ],
  exports: [
    FooterModule,
    HeaderModule,
    ModalModule
  ],
  providers: [
    ModalService
  ]
})

export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
