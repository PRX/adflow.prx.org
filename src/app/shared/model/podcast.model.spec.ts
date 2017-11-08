import { Observable } from 'rxjs/Observable';
import { MockHalDoc } from 'ngx-prx-styleguide';
import { PodcastModel } from './podcast.model';

describe('PodcastModel', () => {

  const makePodcast = (data?: any, extra: any = {} ) => {
    const pDoc = new MockHalDoc(data);
    pDoc.mockItems('prx:campaigns', extra.campaigns || []);
    return new PodcastModel(pDoc);
  }

  it('loads data from the haldoc', () => {
    let podcast = makePodcast({name: 'Hello World'});
    expect(podcast.name).toEqual('Hello World');
    expect(podcast.isNew).toBeFalsy();
  });

  it('uses the podcast id for the key', () => {
    expect(makePodcast({id: 'podcast-id'}).key()).toContain('.podcast-id');
  });

  it('loads related campaigns', () => {
    let campaigns = [{id: 'campaign-one'}, {id: 'campaign-two'}];
    let podcast = makePodcast({name: 'foo'}, {campaigns: campaigns});
    expect(podcast.campaigns.length).toEqual(2);
  });


});
