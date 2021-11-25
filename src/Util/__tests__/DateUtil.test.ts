import getCurrentTime from '../DateUtil';

describe('Date util', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns the correct date in the correct format', () => {
    jest.setSystemTime(new Date(2020, 3, 1));
    expect(getCurrentTime()).toEqual('Wed Apr. 1 at 0:00 AM');
  });

  it('correctly shows PM date', () => {
    jest.setSystemTime(new Date(2020, 3, 1, 13, 30));
    expect(getCurrentTime()).toEqual('Wed Apr. 1 at 1:30 PM');
  });
});
