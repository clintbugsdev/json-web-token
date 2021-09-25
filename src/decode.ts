export interface DecodeInput {
  token: string;
}

function decode({ token }: DecodeInput) {
  const parts = token.split('.');

  if (parts.length !== 3) {
    throw new Error('Invalid JWT');
  }

  const payload = parts[1];

  const buf = Buffer.from(payload, 'base64').toString('utf-8');
  return JSON.parse(buf);
}

export default decode;
