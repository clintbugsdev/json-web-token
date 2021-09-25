import sign from '../src/sign';

describe('sign', () => {
  it('should produce different signatures for different payloads', () => {
    const secret = 'secret';
    const jwtOne = sign({
      payload: { name: 'Clint' },
      secret,
      options: { expiresIn: 8.64e7 },
    }).split('.')[2];
    const jwtTwo = sign({
      payload: { name: 'Clint' },
      secret: `${secret}-123`,
      options: { expiresIn: 8.64e7 },
    }).split('.')[2];

    expect(jwtOne).not.toBe(jwtTwo);
  });

  it('should add the expiry to the payload', () => {
    const secret = 'shhhh';
    const jwtOne = sign({
      payload: { name: 'Clint' },
      secret,
      options: { expiresIn: 8.64e7 },
    }).split('.')[1];

    let buf = Buffer.from(jwtOne, 'base64').toString('utf-8');
    expect(typeof JSON.parse(buf).exp).toBe('number');
  });
});
