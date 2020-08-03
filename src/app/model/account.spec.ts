import { UserAccount } from './account';
import { User } from './user';
import { Address } from './address';


describe('UserAccount', () => {
  it('should create an instance', () => {
    expect(new UserAccount(new User(new Address()), new Address(), new Address())).toBeTruthy();
  });
});
