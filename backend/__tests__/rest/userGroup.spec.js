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
    userName: config.get('auth.testUser.username'),
    auth0id: config.get('auth.testUser.userId'),
  }],
  group: [{
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
      name: 'The Guys',
      maxPrice: 3,
      namesDrawn: 0,
      code: 'randomcode3',
    },
  ],
  userGroups: [{
      id: 1,
      userId: 1,
      groupId: 1,
      userPulledId: null,
      authorizationLevel: 1,
    },
    {
      id: 2,
      userId: 1,
      groupId: 2,
      userPulledId: null,
      authorizationLevel: 2,
    },
    {
      id: 3,
      userId: 1,
      groupId: 3,
      userPulledId: null,
      authorizationLevel: 2,
    },
  ],
};

const dataToDelete = {
  userGroups: [
    1,
    2,
    3,
  ],
  users: [
    1,
  ],
  group: [1, 2, 3],
};

describe('userGroup API', () => {
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

  const url = '/api/userGroups/';

  describe('GET api/userGroups/', () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.group);
      await knex(tables.usergroup).insert(data.userGroups);
    });

    afterAll(async () => {
      await knex(tables.usergroup)
        .whereIn('id', dataToDelete.userGroups)
        .delete();

      await knex(tables.groups)
        .whereIn('id', dataToDelete.group)
        .delete();

      await knex(tables.user)
        .whereIn('id', dataToDelete.users)
        .delete();
    });

    test('return all userGroups', async () => {
      const response = await request.get(url).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body.count).toBeGreaterThanOrEqual(3);
      expect(response.body.items.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('GET /api/userGroups/:id', () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.group);
      await knex(tables.usergroup).insert(data.userGroups[0]);
    });

    afterAll(async () => {
      await knex(tables.usergroup)
        .where('id', dataToDelete.userGroups[0])
        .delete();

      await knex(tables.groups)
        .whereIn('id', dataToDelete.group)
        .delete();

      await knex(tables.user)
        .whereIn('id', dataToDelete.users)
        .delete();
    });

    test('return specific userGroup', async () => {
      const response = await request.get(`${url}${data.userGroups[0].id}`).set('Authorization', authHeader);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        authorizationLevel: 1,
        code: data.group[0].code,
        email: data.user[0].email,
        groupId: 1,
        groupName: data.group[0].name,
        id: 1,
        namesDrawn: 0,
        price: 5,
        userId: 1,
        userName: data.user[0].userName,
        userPulledId: null,
      });
    });
  });

  describe('POST /api/userGroups', () => {
    const userGroupsToDelete = [];

    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.group);
    });
    afterAll(async () => {
      await knex(tables.usergroup)
        .whereIn('id', userGroupsToDelete)
        .delete();

      await knex(tables.groups)
        .whereIn('id', dataToDelete.group)
        .delete();

      await knex(tables.user)
        .whereIn('id', dataToDelete.users)
        .delete();
    });

    test('create an userGroup and return it', async () => {
      const response = await request.post(url).set('Authorization', authHeader).send({
        groupId: 2,
        userPulledId: null,
        authorizationLevel: 1,
      });

      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.groupId).toBe(2);
      expect(response.body.userPulledId).toBeNull();
      expect(response.body.authorizationLevel).toBe(1);
      userGroupsToDelete.push(response.body.id);
    });
  });

  describe('PUT /api/userGroups/:id', () => {

    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.group);
      await knex(tables.usergroup).insert([{
        id: 4,
        userId: 1,
        groupId: 3,
        userPulledId: null,
        authorizationLevel: 1,
      }]);
    });

    afterAll(async () => {
      await knex(tables.usergroup)
        .where('id', 4)
        .delete();

      await knex(tables.groups)
        .whereIn('id', dataToDelete.group)
        .delete();

      await knex(tables.user)
        .whereIn('id', dataToDelete.users)
        .delete();
    });

    test('update and return userGroup', async () => {
      const response = await request.put(`${url}4`).set('Authorization', authHeader).send({
        userPulledId: 1,
        authorizationLevel: 2,
      });

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(4);
      expect(response.body.userId).toBe(1);
      expect(response.body.groupId).toBe(3);
      expect(response.body.userPulledId).toBe(1);
      expect(response.body.authorizationLevel).toBe(2);

    });
  });

  describe('DELETE /api/userGroups/:id', () => {
    beforeAll(async () => {
      await knex(tables.user).insert(data.user);
      await knex(tables.groups).insert(data.group);
      await knex(tables.usergroup).insert([{
        id: 4,
        userId: 1,
        groupId: 2,
        userPulledId: null,
        authorizationLevel: 2,
      }]);
    });
    afterAll(async () => {
      await knex(tables.groups)
        .whereIn('id', dataToDelete.group)
        .delete();

      await knex(tables.user)
        .whereIn('id', dataToDelete.users)
        .delete();
    });

    test('delete the userGroup', async () => {
      const response = await request.delete(`${url}4`).set('Authorization', authHeader);
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });
  });
});