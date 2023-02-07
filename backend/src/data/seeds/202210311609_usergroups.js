module.exports = {
  seed: async (knex) => {
    await knex('UserGroups').insert([
      {
        id: 1,
        userId: 1,
        groupId: 1,
        userPulledId: null,
        authorizationLevel: 1,
      },
      {
        id: 2,
        userId: 3,
        groupId: 1,
        userPulledId: null,
        authorizationLevel: 2,
      },
      {
        id: 3,
        userId: 2,
        groupId: 1,
        userPulledId: null,
        authorizationLevel: 2,
      },
    ]);
  },
};