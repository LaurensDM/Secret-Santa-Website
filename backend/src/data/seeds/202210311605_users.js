module.exports = {
  seed: async (knex) => {
    await knex('Users').insert([
      {
        id: 1,
        userName: 'Laurens',
        email: 'laurens.demaeyer@studenthogent.be',
        auth0id: 'unknown',
      },
      {
        id: 2,
        userName: 'guy',
        email: 'guy@mail.be',
        auth0id: 'unknown',
      },
      {
        id: 3,
        userName: 'guy2',
        email: 'guy2@mail2.be',
        auth0id: 'unknown',
      },
    ]);
  },
};