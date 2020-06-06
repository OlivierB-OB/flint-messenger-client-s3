import { userComparator } from '../utils';

describe('userComparator', () => {
  it('should sort messages on updatedAt desc', async () => {
    const data = [{ updatedAt: '2020-06-06T00:00:00.000Z' }, { updatedAt: '2020-06-06T12:00:00.000Z' }];
    data.sort(userComparator as any);
    expect(data).toEqual([{ updatedAt: '2020-06-06T12:00:00.000Z' }, { updatedAt: '2020-06-06T00:00:00.000Z' }]);
  });

  it('should sort messages on updatedAt desc', async () => {
    const data = [{ updatedAt: '2020-06-06T12:00:00.000Z' }, { updatedAt: '2020-06-06T00:00:00.000Z' }];
    data.sort(userComparator as any);
    expect(data).toEqual([{ updatedAt: '2020-06-06T12:00:00.000Z' }, { updatedAt: '2020-06-06T00:00:00.000Z' }]);
  });
});
