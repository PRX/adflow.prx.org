import { SponsorModel } from './sponsor.model';
import { makeModel } from '../../../testing/helpers';

describe('SponsorModel', () => {

  it('loads data from the haldoc', () => {
    const sponsor = makeModel(SponsorModel, {notes: 'World\s best sponsor'});
    expect(sponsor.notes).toEqual('World\s best sponsor');
    expect(sponsor.isNew).toBeFalsy();
  });

  it('uses the sponsor id for the key', () => {
    const sponsor = makeModel(SponsorModel, {id: 'sponsor-id'});
    expect(sponsor.key()).toContain('.sponsor-id');
  });

});
