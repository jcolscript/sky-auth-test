import request from 'supertest';

import mongoose from '../../src/database';
import app from '../../src/app';
import factory from '../factories';
import User from '../../src/app/models/User';

describe('signin', () => {
  afterEach(async () => {
    await User.remove({});
  });

  afterAll(async done => {
    await mongoose.connection.close();
    done();
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
        password: '123657',
      });

    expect(response.status).toBe(401);
  });

  it('should not authenticate with password missing', async () => {
    const user = await factory.create('User', {
      password: '432243',
    });

    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
      });

    expect(response.status).toBe(400);
  });

  it('should not authenticate with email missing', async () => {
    await factory.create('User', {
      password: '6543213',
    });

    const response = await request(app)
      .post('/signin')
      .send({
        password: '6543213',
      });

    expect(response.status).toBe(400);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/signin')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.body).toHaveProperty('token');
  });
});
