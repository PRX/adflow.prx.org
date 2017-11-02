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

  get podcasts(): HalObservable<HalDoc[]> {
    return this.followItems('prx:podcasts');
  }
}
