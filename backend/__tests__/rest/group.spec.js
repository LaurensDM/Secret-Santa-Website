const {
  withServer,
} = require('../helpers');
const {
  tables,
} = require('../../src/data');

const data = {
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
  groups: [
    1,
    2,
    3,
  ],
};

describe('Group API', () => {
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

  const url = '/api/groups/';

  describe('GET /api/groups', () => {
    beforeAll(async () => {
      await knex(tables.groups).insert(data.groups);
    });

    afterAll(async () => {
      await knex(tables.groups).whereIn('id', dataToDelete.groups).delete();
    });

    test('return all groups', async () => {
      const response = await request.get(url).set('Authorization', authHeader);

      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(3);
      expect(response.body.items.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('GET /api/groups/:id', () => {
    beforeAll(async () => {
      await knex(tables.groups).insert(data.groups[0]);
    });
    afterAll(async () => {
      await knex(tables.groups).where('id', data.groups[0].id).delete();
    });

    test('return specific group', async () => {
      const response = await request.get(`${url}${data.groups[0].id}`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.groups[0]);
    });
  });

  describe('GET /api/groups/code/:code', () => {
    beforeAll(async () => {
      await knex(tables.groups).insert(data.groups[0]);
    });
    afterAll(async () => {
      await knex(tables.groups).where('id', data.groups[0].id).delete();
    });

    test('return specific group by code', async () => {
      const response = await request.get(`${url}code/${data.groups[0].code}`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data.groups[0]);
    });
  });

  describe('POST /api/groups', () => {
    const groupsToDelete = [];

    afterAll(async () => {
      await knex(tables.groups).whereIn('id', groupsToDelete).delete();
    });

    test('create a group and return it', async () => {
      const response = await request.post(url).set('Authorization', authHeader).send({
        name: 'newGroup',
        maxPrice: 50,
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.name).toBe('newGroup');
      expect(response.body.maxPrice).toBe(50);
      expect(response.body.namesDrawn).toBeFalsy();
      expect(response.body.code).toBeTruthy();
      groupsToDelete.push(response.body.id);
    });
  });

  describe('PUT /api/groups/:id', () => {
    beforeAll(async () => {
      await knex(tables.groups).insert(data.groups);
    });
    afterAll(async () => {
      await knex(tables.groups).whereIn('id', dataToDelete.groups).delete();
    });

    test('update and return the updated group', async () => {
      const response = await request.put(`${url}${data.groups[0].id}`).set('Authorization', authHeader).send({
        name: 'changed',
        maxPrice: 40,
        namesDrawn: true,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: data.groups[0].id,
        name: 'changed',
        maxPrice: 40,
        namesDrawn: 1,
        code: data.groups[0].code,
      });
    });
  });

  describe('DELETE /api/groups/:id', () => {
    beforeAll(async () => {
      await knex(tables.groups).insert(data.groups);
    });

    test('delete a group', async () => {
      const response = await request.delete(`${url}${data.groups[0].id}`).set('Authorization', authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});