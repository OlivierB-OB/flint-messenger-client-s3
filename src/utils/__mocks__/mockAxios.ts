import axios from 'axios';

export interface IAxiosMock {
  get: jest.Mock;
  post: jest.Mock;
  patch: jest.Mock;
  delete: jest.Mock;
  restore: () => void;
}

export function mockAxios(): IAxiosMock {
  const backup = {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    delete: axios.delete,
  };
  const mock = {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    restore: () => {
      axios.get = backup.get;
      axios.post = backup.post;
      axios.patch = backup.patch;
      axios.delete = backup.delete;
    },
  };
  axios.get = mock.get;
  axios.post = mock.post;
  axios.patch = mock.patch;
  axios.delete = mock.delete;
  return mock;
}
