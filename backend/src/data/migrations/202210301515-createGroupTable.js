module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('GroupTable', (table) => {
      table.increments('id');

      table.string('name', 64).notNullable();

      table.double('maxPrice').notNullable();

      table.boolean('namesDrawn').notNullable();

      table.string('code', 32).notNullable();

      table.unique('code', 'idx_group_code_unique');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists('GroupTable');
  },
};