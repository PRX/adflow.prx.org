import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule } from 'ngx-prx-styleguide';

import { CoreModule } from './core';
import { SharedModule } from './shared';

import { AppComponent } from './app.component';
import { routing, routingProviders, routingComponents } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    AuthModule,
    BrowserModule,
    CoreModule,
    routing,
    SharedModule
  ],
  providers: [routingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
