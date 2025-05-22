require('dotenv').config()
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

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

    describe('POST /api/tracks', () => {
      test('successfully add a new track', async () => {
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

      test('bad request : add a track without auth token', async () => {
        const newTrack = {
          url: 'https://example.com',
          composer: 'Test Composer',
          performer: 'Test Performer',
          category: 'Test',
        };

        const res = await request(app)
          .post('/api/tracks')
          .send(newTrack);

        expect(res.statusCode).toBe(401);
      });

      test('bad request : add a track with wrong token', async () => {
        const newTrack = {
          url: 'https://example.com',
          composer: 'Test Composer',
          performer: 'Test Performer',
          category: 'Test',
        };

        const randomToken = 'wrongtoken1234567890';
        const res = await request(app)
          .post('/api/tracks')
          .set('x-admin-token', randomToken)
          .send(newTrack);

        expect(res.statusCode).toBe(403);
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
    });

    describe('PUT /api/tracks/:id', () => {
      test('successfully update a track', async () => {
        // Add one first
        const postRes = await request(app)
          .post('/api/tracks')
          .set('X-Admin-Token', token)
          .send({ title: 'ToUpdate', url: 'test', composer: 'test', performer: 'test', category: 'test' });

        const id = postRes.body.id;

        const updateRes = await request(app)
          .put(`/api/tracks/${id}`)
          .set('X-Admin-Token', token)
          .send({ title: 'Updated title', url: 'test', composer: 'test', performer: 'test', category: 'test' });

        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body.title).toBe('Updated title');
      });

      test('bad request: update non exist track', async () => {
        const fakeId = new ObjectId();
        const updateRes = await request(app)
          .put(`/api/tracks/${fakeId}`)
          .set('X-Admin-Token', token)
          .send({ title: 'Updated title', url: 'test', composer: 'test', performer: 'test', category: 'test' });
       
        expect(updateRes.statusCode).toBe(404);
      });
    });

    describe('DELETE /api/tracks/:id', () => {
      test('successfully remove a track', async () => {
        const postRes = await request(app)
          .post('/api/tracks')
          .set('X-Admin-Token', token)
          .send({ title: 'ToDelete', url: 'x', composer: 'test', performer: 'test', category: 'test' });

        const id = postRes.body.id;

        const delRes = await request(app)
          .delete(`/api/tracks/${id}`)
          .set('X-Admin-Token', token);

        expect(delRes.statusCode).toBe(204);
      });

      test('bad request: remove non exist track', async () => {
        const fakeId = new ObjectId();

        const delRes = await request(app)
          .delete(`/api/tracks/${fakeId}`)
          .set('X-Admin-Token', token);

        expect(delRes.statusCode).toBe(404);
      });
    });
  });
});
