import { User } from './user';
import { Address } from './address';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User(new Address())).toBeTruthy();
  });
});
