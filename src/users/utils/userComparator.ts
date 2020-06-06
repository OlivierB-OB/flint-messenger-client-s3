import { IUserInfo } from '../types';

export function userComparator(a: IUserInfo, b: IUserInfo): number {
  return a.updatedAt < b.updatedAt ? 1 : -1;
}
