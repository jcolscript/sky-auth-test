import request from 'supertest';

import mongoose from '../../src/database';
import app from '../../src/app';
import factory from '../factories';
import User from '../../src/app/models/User';

describe('signup', () => {
  afterEach(async () => {
    await User.remove({});
  });

  afterAll(async done => {
    await mongoose.connection.close();
    done();
  });

  it('should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/signup')
      .send(user);

    expect(response.body).toHaveProperty('_id');
  });

  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/signup')
      .send(user);

    const response = await request(app)
      .post('/signup')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to register with invalid fields', async () => {
    const user = await factory.create('User', {
      email: 'abaasd',
      password: '123',
    });

    const response = await request(app)
      .post('/signup')
      .send(user);

    expect(response.status).toBe(400);
  });

  it('should return the valid authenticated user data', async () => {
    const user = await factory.create('User', {
      password: '12345698',
    });

    const response = await request(app)
      .get(`/users/${user._id}`)
      .set('Authorization', `Bearer ${User.generateToken(user._id)}`);

    expect(response.status).toBe(200);
  });

  it('should not return user data if not authenticated', async () => {
    const user = await factory.create('User', {
      password: '3423131',
    });

    const response = await request(app).get(`/users/${user._id}`);

    expect(response.status).toBe(401);
  });

  it('should not return user data if invalid token', async () => {
    const user = await factory.create('User', {
      password: '1231231',
    });

    const response = await request(app)
      .get(`/users/${user._id}`)
      .set('Authorization', `Bearer ${User.generateToken(12312)}`);

    expect(response.status).toBe(401);
  });
});
