import * as assert from 'assert';
import { combine, isDebug } from '../helper';

const env = { ...process.env };
afterEach(() => {
  process.env = env;
});

describe('isDebug', () => {
  it('should return true if we are not in production mode', async () => {
    const container = isDebug();

    expect(isDebug()).toBeTruthy();
  });

  it('should return false if we are in production mode', async () => {
    process.env.NODE_ENV = 'production';
    const container = isDebug();

    expect(isDebug()).toBeFalsy();
  });
});
