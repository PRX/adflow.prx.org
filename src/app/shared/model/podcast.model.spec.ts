import { PodcastModel } from './podcast.model';
import { makeModel } from '../../../testing/helpers';

describe('PodcastModel', () => {

  it('loads data from the haldoc', () => {
    const podcast = makeModel(PodcastModel, {name: 'Hello World'});
    expect(podcast.name).toEqual('Hello World');
    expect(podcast.isNew).toBeFalsy();
  });

  it('uses the podcast id for the key', () => {
    const podcast = makeModel(PodcastModel, {id: 'podcast-id'});
    expect(podcast.key()).toContain('.podcast-id');
  });

  it('loads related campaigns', () => {
    const campaigns = [{id: 'campaign-one'}, {id: 'campaign-two'}];
    const podcast = makeModel(PodcastModel, {name: 'foo'}, null, {campaigns: campaigns});
    expect(podcast.campaigns.length).toEqual(2);
  });

});
