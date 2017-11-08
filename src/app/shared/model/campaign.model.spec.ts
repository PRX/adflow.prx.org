import { Observable } from 'rxjs/Observable';
import { MockHalDoc } from 'ngx-prx-styleguide';
import { CampaignModel } from './campaign.model';

describe('CampaignModel', () => {

  const makeCampaign = (data?: any, extra: any = {} ) => {
    const cDoc = new MockHalDoc(data);
    cDoc.mock('prx:sponsor', extra.sponsor || {});
    return new CampaignModel(null, cDoc);
  }

  it('loads data from the haldoc', () => {
    let campaign = makeCampaign({copy: 'Say hello to world'});
    expect(campaign.copy).toEqual('Say hello to world');
    expect(campaign.isNew).toBeFalsy();
  });

  it('uses the campaign id for the key', () => {
    expect(makeCampaign({id: 'campaign-id'}).key()).toContain('.campaign-id');
  });

  it('loads related sponsor', () => {
    let sponsor = {name: 'sponsor-one'};;
    let campaign = makeCampaign({name: 'foo'}, {sponsor: sponsor});
    expect(campaign.sponsor['name']).toEqual('sponsor-one');
  });


});
