import bcrypt from 'bcrypt-nodejs';

import mongoose from '../../src/database';
import factory from '../factories';
import User from '../../src/app/models/User';

describe('user', () => {
  afterEach(async () => {
    await User.remove({});
  });

  afterAll(async done => {
    await mongoose.connection.close();
    done();
  });

  it('should encrypt user password"', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compareSync('123456', user.password);

    expect(compareHash).toBe(true);
  });
});
