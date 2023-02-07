const config = require('config');

const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');

const data = {
  user: [{
    id: 1,
    email: 'e2e-testing@secretsanta.com',
    userName: config.get('auth.testUser.username'), // 👈
    auth0id: config.get('auth.testUser.userId'), // 👈
  }],
  gifts: [{
      id: 1,
      image: null,
      description: 'Something',
      price: 5,
      link: 'https://www.bol.com',
      userId: 1,
      groupId: 1,
    },
    {
      id: 2,
      image: null,
      description: 'Somethingsomething',
      price: 5,
      link: 'https://www.bol.com',
      userId: 1,
      groupId: 1,
    },
    {
      id: 3,
      image: null,
      description: 'SomethingSomethingSOmething',
      price: 5,
      link: 'https://www.bol.com',
      userId: 1,
      groupId: 1,
    },
  ],
  groups: [{
      id: 1,
      name: 'Loon',
      maxPrice: 5,
      namesDrawn: 0,
      code: 'randomcode1',
    },
    {
      id: 2,
      name: 'Dranken Geers',
      maxPrice: 3,
      namesDrawn: 0,
      code: 'randomcode2',
    },
    {
      id: 3,
      name: 'Irish Pub',
      maxPrice: 4,
      namesDrawn: 0,
      code: 'randomcode3',
    },
  ],

};

const dataToDelete = {
  gifts: [
    1,
    2,
    3,
  ],
  user: [1],
  groups: [1, 2, 3],
};

describe('GiftApi', () => {
  let request;
  let knex;
  let authHeader;

  withServer(({
    knex: k,
    request: r,
    authHeader: a,
  }) => {
    knex = k;
    request = r;
    authHeader = a;
  });



  const url = '/api/gifts/';

  describe('GET /api/gifts/', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.groups);
      await knex(tables.gifts).insert(data.gifts);
    });

    afterAll(async () => {
      await knex(tables.gifts).whereIn('id', dataToDelete.gifts).delete();
      await knex(tables.user).where('id', dataToDelete.user).delete();
      await knex(tables.groups).whereIn('id', dataToDelete.groups).delete();
    });

    test('return all gifts', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(3);
      expect(response.body.items.length).toBeGreaterThanOrEqual(3);

    });

  });

  describe('GET /api/gifts/:id', () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.groups);
      await knex(tables.gifts).insert(data.gifts[0]);
    });

    afterAll(async () => {
      await knex(tables.gifts).where('id', data.gifts[0].id).delete();
      await knex(tables.user).where('id', dataToDelete.user).delete();
      await knex(tables.groups).whereIn('id', dataToDelete.groups).delete();
    });

    test('return requested gift', async () => {
      const response = await request.get(`${url}${data.gifts[0].id}`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.gifts[0]);
    });
  });

  describe('POST /api/gifts/', () => {
    const giftsToDelete = [];

    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.groups);
    });

    afterAll(async () => {
      await knex(tables.gifts).where('id', giftsToDelete).delete();
      await knex(tables.user).whereIn('id', dataToDelete.user).delete();
      await knex(tables.groups).whereIn('id', dataToDelete.groups).delete();
    });

    test('create and return a new gift', async () => {
      const response = await request.post(url).set('Authorization', authHeader).send({
        image: null,
        description: 'oi',
        price: 50,
        link: 'noLink',
        groupId: 2,
      });
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.description).toBe('oi');
      expect(response.body.image).toBeNull();
      expect(response.body.price).toBe(50);
      expect(response.body.link).toBe('noLink');
      expect(response.body.userId).toBe(data.user[0].id);

      giftsToDelete.push(response.body.id);
    });

  });

  describe('PUT /api/gifts/:id', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.groups);
      await knex(tables.gifts).insert(data.gifts);
    });

    afterAll(async () => {
      await knex(tables.gifts).whereIn('id', dataToDelete.gifts).delete();
      await knex(tables.user).whereIn('id', dataToDelete.user).delete();
      await knex(tables.groups).whereIn('id', dataToDelete.groups).delete();
    });

    test('return and update a gift', async () => {
      const response = await request.put(`${url}${data.gifts[0].id}`).set('Authorization', authHeader)
        .send({
          image: null,
          description: 'changed',
          price: 49.99,
          link: 'noLink',
          groupId: 1,
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: data.gifts[0].id,
        image: null,
        description: 'changed',
        price: 49.99,
        link: 'noLink',
        userId: 1,
        groupId: 1,
      });
    });
  });

  describe('DELETE /api/gifts/:id', () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.groups);
      await knex(tables.gifts).insert(data.gifts[0]);
    });

    afterAll(async () => {
      await knex(tables.user).whereIn('id', dataToDelete.user).delete();
      await knex(tables.groups).whereIn('id', dataToDelete.groups).delete();
    });

    test('delete the gift', async () => {
      const response = await request.delete(`${url}${data.gifts[0].id}`).set('Authorization', authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });

});