import { decode, sign } from '../src/';

describe('decode', () => {
  it('should decode the token payload', () => {
    const token = sign({
      payload: {
        name: 'ClintBugsDev',
      },
      secret: 'zzZZZZzzz',
    });

    const decoded = decode({ token });

    expect(decoded.name).toBe('ClintBugsDev');
  });
});
