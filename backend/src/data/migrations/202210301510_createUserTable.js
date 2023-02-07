module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('Users', (table) => {
      table.increments('id');

      table.string('userName', 256).notNullable();

      table.string('email',512).notNullable();

      table.string('auth0id',255).notNullable();

      table.unique('email','idx_user_email_unique');

    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists('Users');
  },
};