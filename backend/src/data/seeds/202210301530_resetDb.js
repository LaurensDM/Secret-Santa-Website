module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table
    await knex('GroupTable').delete();
    await knex('Users').delete();
    await knex('Gifts').delete();
    await knex('UserGroups').delete();
  },
};