import { MockHalDoc } from 'ngx-prx-styleguide';
import { makeModel } from '../../../testing/helpers';
import { CreativeModel } from './creative.model';

describe('CreativeModel', () => {

  it('loads data from the haldoc', () => {
    const creative = makeModel(CreativeModel, {filename: 'creative-one'}, {originalCopy: 'parent campaign copy'});
    expect(creative.filename).toEqual('creative-one');
    expect(creative.isNew).toBeFalsy();
  });

  it('uses the creative id for the key', () => {
    const creative = makeModel(CreativeModel, {id: 'creative-id'}, {originalCopy: 'parent campaign copy'});
    expect(creative.key()).toContain('.creative-id');
  });

  it('uses the campaign id for a new creative key', () => {
    const newCreative = new CreativeModel(new MockHalDoc({id: 'campaign-id'}), null);
    expect(newCreative.key()).toContain('.new');
    expect(newCreative.key()).toContain('.campaign-id');
    expect(newCreative.isNew).toBeTruthy();
  });

});
