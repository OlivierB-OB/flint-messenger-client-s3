import { history } from '../../history';

export interface IHistoryMock {
  push: jest.Mock;
  restore: () => void;
}

export function mockHistory(): IHistoryMock {
  const backup = {
    push: history.push,
  };
  const mock = {
    push: jest.fn(),
    restore: () => {
      history.push = backup.push;
    },
  };
  history.push = mock.push;
  return mock;
}
