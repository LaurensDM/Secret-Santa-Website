module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('UserGroups', (table) => {
      table.increments('id');

      table.integer('userId').unsigned().notNullable();

      table.integer('groupId').unsigned().notNullable();

      table.integer('userPulledId').unsigned().nullable();

      table.integer('authorizationLevel').notNullable();

      table.foreign('userId', 'fk_UserGroups_Users').references('Users.id').onDelete('CASCADE');

      table.foreign('groupId', 'fk_UserGroups_GroupTable').references('GroupTable.id').onDelete('CASCADE');

      table.foreign('userPulledId', 'fk_UserGroups_Users_Users').references('Users.id').onDelete('SET NULL');

    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists('UserGroups');
  },
};