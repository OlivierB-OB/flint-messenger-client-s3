export interface IMockable {
  mock<U>(mock: U): [U, () => void];
}

export function action<T>(impl: T): T & IMockable {
  const res = (...args: any[]) => (impl as any)(...args);
  res.mock = <U extends jest.Mock>(mock: U): [U, () => void] => {
    const backup = impl;
    impl = mock as any;
    mock.mockReturnValue(() => undefined);
    return [mock, () => (impl = backup)];
  };
  return res as any;
}
