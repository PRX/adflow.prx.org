import { CampaignModel } from './campaign.model';
import { makeModel } from '../../../testing/helpers';

describe('CampaignModel', () => {

  it('loads data from the haldoc', () => {
    const campaign = makeModel(CampaignModel, {copy: 'Say hello to world'});
    expect(campaign.copy).toEqual('Say hello to world');
    expect(campaign.isNew).toBeFalsy();
  });

  it('uses the campaign id for the key', () => {
    expect(makeModel(CampaignModel, {id: 'campaign-id'}).key()).toContain('.campaign-id');
  });

  it('loads related sponsor', () => {
    const sponsor = {name: 'sponsor-one'};
    const campaign = makeModel(CampaignModel, {name: 'foo'}, null, {sponsor: sponsor});
    expect(campaign.sponsor['name']).toEqual('sponsor-one');
  });

});
