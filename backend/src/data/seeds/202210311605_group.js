
module.exports = {
  seed: async (knex) => {
    await knex('GroupTable').insert([
      {
        id: 1,
        name: 'Loon',
        maxPrice: 5,
        namesDrawn: false,
        code:'randomcode1',
      },
      {
        id: 2,
        name: 'Dranken Geers',
        maxPrice: 3,
        namesDrawn: false,
        code:'randomcode2',
      },
      {
        id: 3,
        name: 'Irish Pub',
        maxPrice: 4,
        namesDrawn: false,
        code:'randomcode3',
      },
    ]);
  },
};