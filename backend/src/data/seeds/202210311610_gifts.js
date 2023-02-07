

module.exports = {
  seed: async (knex) => {
    await knex('Gifts').insert([
      {
        id: 1,
        image: undefined,
        description: 'Something',
        price: 5,
        link: 'https://www.bol.com',
        userId: 1,
        groupId: 1,
      },
      {
        id: 2,
        image: undefined,
        description: 'Somethingsomething',
        price: 5,
        link: 'https://www.bol.com',
        userId: 1,
        groupId: 1,
      },
      {
        id: 3,
        image: undefined,
        description: 'SomethingSomethingSOmething',
        price: 5,
        link: 'https://www.bol.com',
        userId: 1,
        groupId: 1,
      },
    ]);
  },
};