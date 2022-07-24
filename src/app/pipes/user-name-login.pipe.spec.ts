import { UserNameLoginPipe } from './user-name-login.pipe';

describe('UserNameLoginPipe', () => {
  it('create an instance', () => {
    const pipe = new UserNameLoginPipe();
    expect(pipe).toBeTruthy();
  });
});
