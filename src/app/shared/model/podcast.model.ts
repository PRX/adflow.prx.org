import { BaseModel, HalDoc } from 'ngx-prx-styleguide';
import { Observable } from 'rxjs/Observable';

export class PodcastModel extends BaseModel {
  public id: number;
  public name: string;
  public network: string;
  public notes: string;
  public rate: string;
  public structure: string;
  public recordingDay: string;
  public campaigns = []; //CampaignModel[] = [];

  SETABLE = []; // podcasts are read only

  VALIDATORS = {};

  constructor(podcast: HalDoc, loadRelated = true) {
    super();
    this.init(null, podcast, loadRelated);
  }

  key(): string {
    if (this.doc) {
      return `prx.podcast.${this.doc.id}`;
    }
  }

  related(): {} {
    let campaigns = Observable.of([]);
    if (this.doc && this.doc.has('prx:campaigns')) {
      campaigns = this.doc.followItems('prx:campaigns'); // turn to CampaignModel
    }
    return { campaigns: campaigns };
  }

  decode(): void {
    this.id = this.doc['id'];
    this.name = this.doc['name'];
    this.network = this.doc['network'];
    this.notes = this.doc['notes'];
    this.rate = this.doc['rate'];
    this.structure = this.doc['structure'];
    this.recordingDay = this.doc['recordingDay'];
  }

  encode(): {} {
    return {}; // podcasts are read only
  }

  saveNew(data: {}): Observable<HalDoc> {
    return Observable.throw(new Error('Cannot directly create a jingle podcast'));
  }
}
