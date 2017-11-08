import { BaseModel, HalDoc } from 'ngx-prx-styleguide';
import { Observable } from 'rxjs/Observable';
import { SponsorModel } from './sponsor.model'

export class CampaignModel extends BaseModel {
  public id: number;
  public startDate: Date;
  public endDate: Date;
  public dueDate: Date;
  public copy: string;
  public zone: string;
  public approved = false;
  public sponsor: SponsorModel;

  SETABLE = ['copy'];

  VALIDATORS = {};

  constructor(podcast: HalDoc, campaign: HalDoc, loadRelated = true) {
    super();
    this.init(podcast, campaign, loadRelated);
  }

  key(): string {
    if (this.doc) {
      return `prx.campaign.${this.doc.id}`;
    }
  }

  related(): {} {
    let sponsor = Observable.of(null);
    if (this.doc && this.doc.has('prx:sponsor')) {
      sponsor = this.doc.follow('prx:sponsor').map(sDoc => new SponsorModel(sDoc));
    }
    return { sponsor: sponsor };
  }

  decode(): void {
    this.id = this.doc['id'];
    this.startDate = new Date(this.doc['start_date']);
    this.endDate = new Date(this.doc['end_date']);
    this.copy = this.doc['copy'];
    this.zone = this.doc['zone'];
    this.dueDate = this.doc['due_date'] ? new Date(this.doc['due_date']) : new Date(); // TODO add due date to campaigns
    this.approved = this.doc['approved']; // TODO add approved to campaigns
  }

  encode(): {} {
    const data = <any> {};
    data.id = this.id;
    data.startDate = this.startDate;
    data.endDate = this.endDate;
    data.dueDate = this.dueDate;
    data.copy = this.copy;
    data.zone = this.zone;
    return data;
  }

  saveNew(data: {}): Observable<HalDoc> {
    return Observable.throw(new Error('Cannot directly create a jingle campaign'));
  }
}
