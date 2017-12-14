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
  public originalCopy: string;
  public editedCopy: string;
  public mustSay: string;
  public zone: string;
  public notes: string;
  public approved = false;
  public sponsor: SponsorModel;

  SETABLE = ['editedCopy', 'approved'];

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
    this.originalCopy = this.doc['originalCopy'];
    this.editedCopy = this.doc['editedCopy'] || this.doc['mustSay'];
    this.mustSay = this.doc['mustSay'];
    this.notes = this.doc['notes'];
    this.zone = this.doc['zone'];
    this.startDate = new Date(this.doc['startDate']);
    this.endDate = new Date(this.doc['endDate']);
    this.dueDate = new Date(this.doc['dueDate']);
    this.updatedAt = new Date(this.doc['updatedAt']);
    this.approved = this.doc['approved']; // TODO add helper method to compare this to whether sponsor requires approval
  }

  encode(): {} {
    const data = <any> { edited_copy : this.editedCopy };
    if (data.approved) {
      data.approved = this.approved;
    }
    return { campaign: data };
  }

  saveNew(data: {}): Observable<HalDoc> {
    return Observable.throw(new Error('Cannot directly create a jingle campaign'));
  }
}
