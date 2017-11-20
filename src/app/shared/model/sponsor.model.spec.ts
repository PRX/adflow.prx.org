import { MockHalDoc } from 'ngx-prx-styleguide';
import { SponsorModel } from './sponsor.model';

describe('SponsorModel', () => {

  const makeSponsor = (data?: any, extra: any = {} ) => {
    const sDoc = new MockHalDoc(data);
    return new SponsorModel(sDoc);
  };

  it('loads data from the haldoc', () => {
    const sponsor = makeSponsor({notes: 'World\s best sponsor'});
    expect(sponsor.notes).toEqual('World\s best sponsor');
    expect(sponsor.isNew).toBeFalsy();
  });

  it('uses the sponsor id for the key', () => {
    expect(makeSponsor({id: 'sponsor-id'}).key()).toContain('.sponsor-id');
  });

});
