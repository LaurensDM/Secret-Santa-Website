module.exports = {
  up: async (knex) => {
    await knex.schema.createTable('Gifts', (table) => {
      table.increments('id');

      table.string('image',255).nullable();

      table.string('description', 512);

      table.double('price');

      table.string('link',512);

      table.integer('userId').unsigned().notNullable();
      
      table.integer('groupId').unsigned().notNullable();

      table.foreign('groupId', 'fk_Gifts_GroupTable').references('GroupTable.id').onDelete('CASCADE');

      table.foreign('userId', 'fk_Gifts_Users').references('Users.id').onDelete('CASCADE');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists('Gifts');
  },
};