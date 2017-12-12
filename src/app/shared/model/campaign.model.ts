import { BaseModel, HalDoc } from 'ngx-prx-styleguide';
import { Observable } from 'rxjs/Observable';
import { SponsorModel } from './sponsor.model';

export class CampaignModel extends BaseModel {
  public id: number;
  public startDate: Date;
  public endDate: Date;
  public dueDate: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public copy: string;
  public zone: string;
  public approved = false;
  public sponsor: SponsorModel;

  SETABLE = ['copy', 'approved'];

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
      sponsor = this.doc.follow('prx:sponsor').map(sDoc => new SponsorModel(null, sDoc));
    }
    return { sponsor: sponsor };
  }

  decode(): void {
    this.id = this.doc['id'];
    this.copy = this.doc['copy'];
    this.zone = this.doc['zone'];
    this.startDate = new Date(this.doc['startDate']);
    this.endDate = new Date(this.doc['endDate']);
    this.dueDate = this.doc['dueDate'] ? new Date(this.doc['dueDate']) : new Date(); // TODO add due date to campaigns
    this.updatedAt = this.doc['updatedAt'] ? new Date(this.doc['updatedAt']) : new Date(); // TODO add updated date to campaigns
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
    data.approved = this.approved;
    return data;
  }

  saveNew(data: {}): Observable<HalDoc> {
    return Observable.throw(new Error('Cannot directly create a jingle campaign'));
  }
}
