import { BaseModel, HalDoc } from 'ngx-prx-styleguide';
import { Observable } from 'rxjs/Observable';

export class CreativeModel extends BaseModel {
  public id: number;
  public status: string;
  public filename: string;
  public zone: string;
  public size: number;
  public contentType: string;
  public label: string;
  public length: number;
  public layer: number;
  public bitRate: number;
  public channelMode: string;
  public uploadPath: string;
  public format: string;

  SETABLE = []; // TODO

  VALIDATORS = {}; // TODO

  constructor(campaign: HalDoc, creative: HalDoc, loadRelated = true) {
    super();
    this.init(campaign, creative, loadRelated);
  }

  key(): string {
    if (this.doc) {
      return `prx.creative.${this.doc.id}`;
    } else {
      return `prx.creative.new.${this.parent.id}`; // new creative in existing campaign
    }
  }

  related(): {} {
    return {};
  }

  decode(): void {
    this.id = this.doc['id'];
    this.status = this.doc['status'];
    this.filename = this.doc['filename'];
    this.zone = this.doc['zone'];
    this.size = this.doc['size'];
    this.contentType = this.doc['contentType'];
    this.label = this.doc['label'];
    this.length = this.doc['length'];
    this.layer = this.doc['layer'];
    this.bitRate = this.doc['bitRate'];
    if (this.bitRate) { this.bitRate = this.bitRate * 1000; }
    this.channelMode = this.doc['channelMode'];
    this.uploadPath = this.doc['uploadPath'];
    this.format = this.doc['format'];
  }

  encode(): {} {
    const data = <any> {};
    data.id = this.id;
    data.status = this.status;
    data.filename = this.filename;
    data.zone = this.zone;
    data.size = this.size;
    data.contentType = this.contentType;
    data.label = this.label;
    data.length = this.length;
    data.layer = this.layer;
    data.bitRate = this.bitRate;
    data.channelMode = this.channelMode;
    data.uploadPath = this.uploadPath;
    data.format = this.format;
    return data;
  }

  saveNew(data: {}): Observable<HalDoc> {
    // when time to implement this, look to Uploadable Model from Publish
    return this.parent.create('prx:creative', {}, data).map(doc => doc);
  }
}
