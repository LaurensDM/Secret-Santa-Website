const { shutdownData, getKnex, tables } = require('../src/data');

module.exports = async () => {
  // Remove any leftover data
  await getKnex()(tables.usergroup).delete();
  await getKnex()(tables.gifts).delete();
  await getKnex()(tables.user).delete();
  await getKnex()(tables.groups).delete();
  

  // Close database connection
  await shutdownData();
};
