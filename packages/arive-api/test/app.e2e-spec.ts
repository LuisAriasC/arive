import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { AppModule } from '../src/app.module';
import { HOBBIES, refresh, USERS } from './fixtures';

describe('User Controller (mongoose - e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
        forbidUnknownValues: true,
      }),
    );

    await app.init();
    await refresh(app.get(getConnectionToken()));
  });

  afterEach(async() => await refresh(app.get(getConnectionToken())));

  describe('create one', () => {
    it('should allow creation of one user', () => {
      request(app.getHttpServer())
      .post('/user/create')
      .send({
        name: 'Tested User',
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.id).toEqual(expect.any(String))
        expect(body.name).toEqual('Tested User')
        expect(body.createdAt).toEqual(expect.any(String))
        expect(body.updatedAt).toEqual(expect.any(String))
      })
    })
  });

  describe('read one', () => {
    it('should return a valid user', () => {
      request(app.getHttpServer())
      .get(`/user`)
      .query({
        id: USERS[0].id
      })
      .expect(200, {
        id: USERS[0].id,
        name: USERS[0].name,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      });
    })

    it('should return an empty object if invalid user', () => {
      request(app.getHttpServer())
      .get(`/user`)
      .query({
        id: 'ksdhyghdnnnmcsdhgtomjjjj'
      })
      .expect(400, {})
    })
  });

  describe('update one', () => {
    it('should return an updated user', () => {
      request(app.getHttpServer())
      .put(`/user/update`)
      .query({
        id: USERS[0].id
      })
      .send({
        name: 'A Test User'
      })
      .expect(200, {
        id: USERS[0].id,
        name: 'A Test User',
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })

    it('should return an empty object if invalid user to update', () => {
      request(app.getHttpServer())
      .put(`/user/update`)
      .query({
        id: 'ksdhyghdnnnmcsdhgtomjjjj'
      })
      .send({
        name: 'A user'
      })
      .expect(400, {})
    })
  });

  describe('list users', () => {
    it('should return a list of users', () => {
      request(app.getHttpServer())
      .get(`/user/users`)
      .send()
      .expect(200, [
        {
          id: USERS[0].id, 
          name: USERS[0].name,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        },
      ])
    })
  });

  describe('delete one', () => {
    it('should return a deleted user', () => {
      request(app.getHttpServer())
      .delete(`/user/delete`)
      .query({
        id: USERS[0].id
      })
      .send()
      .expect(200, {
        id: USERS[0].id, 
        name: USERS[0].name,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      })
    })

    it('should return an error if invalid user to delete', () => {
      request(app.getHttpServer())
      .delete(`/user/delete`)
      .query({
        id: 'ksdhyghdnnnmcsdhgtomjjjj'
      })
      .send()
      .expect(400, {
        name: "MongoError"
      })
    })
  });

  describe('create one', () => {
    it('should allow creation of one hobby', () => {
      request(app.getHttpServer())
      .post('/hobby/create')
      .send({
        name: 'Hobbie Test',
        passionLevel: 'High',
        year: 2020,
        user: USERS[0].id
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.id).toEqual(expect.any(String))
        expect(body.name).toEqual('Hobbie Test')
        expect(body.passionLevel).toEqual('High'),
        expect(body.year).toEqual(2020),
        expect(body.createdAt).toEqual(expect.any(String))
        expect(body.updatedAt).toEqual(expect.any(String))
      })
    })
  });

  describe('read one', () => {
    it('should return a valid hobby', () => {
      request(app.getHttpServer())
      .get(`/hobby`)
      .query({
        id: HOBBIES[0].id
      })
      .expect(200, {
        id: HOBBIES[0].id,
        name: HOBBIES[0].name,
        passionLevel: HOBBIES[0].passionLevel,
        year: HOBBIES[0].year,
        user: HOBBIES[0].user,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      });
    })

    it('should return an empty object if invalid hobby', () => {
      request(app.getHttpServer())
      .get(`/hobby`)
      .query({
        id: 'ksdhyghdnnnmcsdhgtomjjjj'
      })
      .expect(400, {})
    })
  });

  describe('update one', () => {
    it('should return an updated hobby', () => {
      request(app.getHttpServer())
      .put(`/hobby/update`)
      .query({
        id: HOBBIES[0].id
      })
      .send({
        name: 'A Test Hobby'
      })
      .expect(200, {
        id: HOBBIES[0].id,
        name: 'A Test Hobby',
        passionLevel: HOBBIES[0].passionLevel,
        year: HOBBIES[0].year,
        user: HOBBIES[0].user,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })

    it('should return an empty object if invalid hobby to update', () => {
      request(app.getHttpServer())
      .put(`/hobby/update`)
      .query({
        id: 'ksdhyghdnnnmcsdhgtomjjjj'
      })
      .send({
        name: 'A hobby'
      })
      .expect(400, {})
    })
  });

  describe('list user hobbies', () => {
    it('should return a list of hobbies by user', () => {
      request(app.getHttpServer())
      .get(`/hobby/user-hobbies`)
      .query({
          id: USERS[0].id
      })
      .send()
      .expect(200, [
          {            
            id: HOBBIES[0].id,
            name: HOBBIES[0].name,
            passionLevel: HOBBIES[0].passionLevel,
            year: HOBBIES[0].year,
            user: HOBBIES[0].user,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        },
        {
            id: HOBBIES[1].id,
            name: HOBBIES[1].name,
            passionLevel: HOBBIES[1].passionLevel,
            year: HOBBIES[1].year,
            user: HOBBIES[1].user,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        },
        {
            id: HOBBIES[2].id,
            name: HOBBIES[2].name,
            passionLevel: HOBBIES[2].passionLevel,
            year: HOBBIES[2].year,
            user: HOBBIES[2].user,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        }
      ])
    })
  });

  describe('delete one', () => {
    it('should return a deleted hobby', () => {
      request(app.getHttpServer())
      .delete(`/hobby/delete`)
      .query({
        id: HOBBIES[0].id
      })
      .send()
      .expect(200, {
        id: HOBBIES[0].id,
        name: HOBBIES[0].name,
        passionLevel: HOBBIES[0].passionLevel,
        year: HOBBIES[0].year,
        user: HOBBIES[0].user,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      })
    })

    it('should return an error if invalid hobby to delete', () => {
      request(app.getHttpServer())
      .delete(`/hobby/delete`)
      .query({
        id: 'ksdhyghdnnnmcsdhgtomjjjj'
      })
      .send()
      .expect(400, {
        name: "MongoError"
      })
    })
  });

  afterAll(async () => {
    await app.close();
  });
});