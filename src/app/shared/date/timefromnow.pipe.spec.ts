import { TimeFromNowPipe } from './timefromnow.pipe';

describe('TimeFromNowPipe', () => {

  const pipe = new TimeFromNowPipe();
  const baseTime = new Date('2000-01-01T12:00:00+00:00');

  const transform = (dateStr: string): string => {
    return pipe.transform(new Date(dateStr));
  };

  beforeEach(() => {
    jasmine.clock().mockDate(baseTime);
    spyOn(Date.prototype, 'getDate').and.callFake(Date.prototype.getUTCDate);
    spyOn(Date.prototype, 'getHours').and.callFake(Date.prototype.getUTCHours);
  });

  it('returns `Immediately` for due date within next minute or in past', () => {
    expect(transform('2000-01-01T11:59:59+00:00')).toMatch('Immediately');
    expect(transform('2000-01-01T12:00:30+00:00')).toMatch('Immediately');
  });

  it('returns minutes for anything under an hour', () => {
    expect(transform('2000-01-01T12:01:00+00:00')).toMatch('In 1 minute');
    expect(transform('2000-01-01T12:30:00+00:00')).toMatch('In 30 minutes');
  });

  it('returns hours for anything under a day', () => {
    expect(transform('2000-01-01T15:00:00+00:00')).toMatch('In about 3 hours');
    expect(transform('2000-01-01T13:00:00+00:00')).toMatch('In about 1 hour');
  });

  it('returns days for anything under a week', () => {
    expect(transform('2000-01-04T12:01:00+00:00')).toMatch('In about 3 days');
    expect(transform('2000-01-02T12:30:00+00:00')).toMatch('In about 1 day');
  });

  it('returns weeks and days for anything under 2 weeks', () => {
    expect(transform('2000-01-08T12:00:00+00:00')).toMatch('In 1 week');
    expect(transform('2000-01-10T12:00:00+00:00')).toMatch('In 1 week 2 days');
  });

});
