import { Injectable } from '@angular/core';
import { HalBaseService, HalDoc, HalObservable } from 'ngx-prx-styleguide';
import { Env } from '../core.env';

@Injectable()
export class JingleService extends HalBaseService {

  get host(): string {
    return Env.JINGLE_HOST;
  }

  get path(): string {
    return '/api/v1';
  }

  get ttl(): number {
    return Env.JINGLE_TTL;
  }

  get campaigns(): HalObservable<HalDoc[]> {
    return this.followItems('prx:campaigns');
  }

  get podcasts(): HalObservable<HalDoc[]> {
    return this.followItems('prx:podcasts');
  }

  // get defaultAccount(): HalObservable<HalDoc> {
  //   return this.auth.follow('prx:default-account');
  // }

  // get individualAccount(): HalObservable<HalDoc> {
  //   return <HalObservable<HalDoc>> this.auth.followItems('prx:accounts').map(accountDocs => {
  //     return accountDocs.find(d => d['type'] === 'IndividualAccount');
  //   });
  // }

  // get accounts(): HalObservable<HalDoc[]> {
  //   return this.auth.followItems('prx:accounts');
  // }
  //
}
