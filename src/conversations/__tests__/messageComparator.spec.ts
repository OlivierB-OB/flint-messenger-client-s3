import { messageComparator } from '../utils';

describe('messageComparator', () => {
  it('should sort messages on createdAt asc', async () => {
    const data = [{ createdAt: '2020-06-06T00:00:00.000Z' }, { createdAt: '2020-06-06T12:00:00.000Z' }];
    data.sort(messageComparator as any);
    expect(data).toEqual([{ createdAt: '2020-06-06T00:00:00.000Z' }, { createdAt: '2020-06-06T12:00:00.000Z' }]);
  });

  it('should sort messages on createdAt asc', async () => {
    const data = [{ createdAt: '2020-06-06T12:00:00.000Z' }, { createdAt: '2020-06-06T00:00:00.000Z' }];
    data.sort(messageComparator as any);
    expect(data).toEqual([{ createdAt: '2020-06-06T00:00:00.000Z' }, { createdAt: '2020-06-06T12:00:00.000Z' }]);
  });
});
