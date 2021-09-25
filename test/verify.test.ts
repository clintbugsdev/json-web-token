import { sign, verify } from '../src';

describe('verify', () => {
  it('should verify and decode a valid token', () => {
    const secret = 'zzzZZZzzz';
    const token = sign({
      payload: {
        name: 'ClintBugsDev',
      },
      secret,
    });

    const verified = verify({ token, secret });

    expect(verified.name).toBe('ClintBugsDev');
  });

  it('should throw if the signature is invalid', () => {
    const secretOne = 'zzzZZZzzz';
    const secretTwo = 'secretTwo';

    const token = sign({
      payload: {
        name: 'ClintBugsDev',
      },
      secret: secretOne,
    });

    try {
      verify({ token, secret: secretTwo });
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('Invalid signature');
      }
    }
  });

  it('should throw if the token has expired', () => {
    const secret = 'sssSSSss';

    const token = sign({
      payload: { name: 'ClintBugsDev' },
      secret,
      options: {
        expiresIn: -8.64e7,
      },
    });

    try {
      verify({ token, secret });
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe('Token has expired');
      }
    }
  });
});
