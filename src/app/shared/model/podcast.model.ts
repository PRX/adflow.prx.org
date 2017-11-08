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
      console.log('has campaigns')
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
    let data = <any> {};
    data.id = this.id;
    data.name = this.name;
    data.network = this.network;
    data.notes = this.notes;
    data.rate = this.rate;
    data.structure = this.structure;
    data.recordingDay = this.recordingDay;
    // data.campaigns = this.campaigns;

    // data.field = this.field;
    // returns an object with the model's data used in persisting the underlying HalDoc
    return data;
  }

  saveNew(data: {}): Observable<HalDoc> {
    return Observable.throw(new Error('Cannot directly create a jingle podcast'));
  }
}
