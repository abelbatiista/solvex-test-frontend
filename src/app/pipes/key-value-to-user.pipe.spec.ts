import { KeyValueToUserPipe } from './key-value-to-user.pipe';

describe('KeyValueToUserPipe', () => {
  it('create an instance', () => {
    const pipe = new KeyValueToUserPipe();
    expect(pipe).toBeTruthy();
  });
});
