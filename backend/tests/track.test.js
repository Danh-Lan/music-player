require('dotenv').config()
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
if (!adminUsername || !adminPassword) {
  throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set in the environment variables');
}

let token = '';

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Tracks API', () => {
  describe('Public routes', () => {
    test('get all tracks', async () => {
      const res = await request(app).get('/api/tracks');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('Protected routes', () => {
    beforeAll(async () => {
      // Get token from login route
      const res = await request(app)
        .post('/api/login')
        .send({ username: adminUsername, password: adminPassword });

      token = res.body.token;
    });

    test('add a new track', async () => {
      const newTrack = {
        title: 'Test Song',
        url: 'https://example.com',
        composer: 'Test Composer',
        performer: 'Test Performer',
        category: 'Test',
      };

      const res = await request(app)
        .post('/api/tracks')
        .set('x-admin-token', token)
        .send(newTrack);

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe(newTrack.title);
    });

    test('bad request : add a track without title', async () => {
      const newTrack = {
        url: 'https://example.com',
        composer: 'Test Composer',
        performer: 'Test Performer',
        category: 'Test',
      };

      const res = await request(app)
        .post('/api/tracks')
        .set('X-Admin-Token', token)
        .send(newTrack);

      expect(res.statusCode).toBe(400);
    });

    // test('PUT /api/playlist/:id updates item', async () => {
    //   // Add one first
    //   const postRes = await request(app)
    //     .post('/api/playlist')
    //     .set('X-Admin-Token', token)
    //     .send({ title: 'ToUpdate', url: 'x', composer: '', performer: '', category: '' });

    //   const id = postRes.body._id;

    //   const updateRes = await request(app)
    //     .put(`/api/playlist/${id}`)
    //     .set('X-Admin-Token', token)
    //     .send({ title: 'Updated Title' });

    //   expect(updateRes.statusCode).toBe(200);
    //   expect(updateRes.body.title).toBe('Updated Title');
    // });

    // test('DELETE /api/playlist/:id removes item', async () => {
    //   const postRes = await request(app)
    //     .post('/api/playlist')
    //     .set('X-Admin-Token', token)
    //     .send({ title: 'ToDelete', url: 'x', composer: '', performer: '', category: '' });

    //   const id = postRes.body._id;

    //   const delRes = await request(app)
    //     .delete(`/api/playlist/${id}`)
    //     .set('X-Admin-Token', token);

    //   expect(delRes.statusCode).toBe(204);
    // });
  });
});
