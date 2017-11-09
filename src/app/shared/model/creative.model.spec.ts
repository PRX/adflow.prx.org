import { Observable } from 'rxjs/Observable';
import { MockHalDoc } from 'ngx-prx-styleguide';
import { CreativeModel } from './creative.model';

describe('CreativeModel', () => {

  const makeCreative = (data?: any) => {
    const campaignDoc = new MockHalDoc({copy: 'test-campaign'});
    const creativeDoc = new MockHalDoc(data);
    return new CreativeModel(campaignDoc, creativeDoc);
  };

  it('loads data from the haldoc', () => {
    const creative = makeCreative({filename: 'creative-one'});
    expect(creative.filename).toEqual('creative-one');
    expect(creative.isNew).toBeFalsy();
  });

  it('uses the creative id for the key', () => {
    expect(makeCreative({id: 'creative-id'}).key()).toContain('.creative-id');
  });

});
