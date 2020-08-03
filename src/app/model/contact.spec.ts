import { Contact } from './contact';
import { UserAccount } from './account';
import { User } from './user';
import { Address } from './address';

describe('Contact', () => {
  it('should create an instance', () => {
    expect(new Contact(new Address(), new UserAccount(new User(new Address()), new Address(), new Address()))).toBeTruthy();
  });
});
