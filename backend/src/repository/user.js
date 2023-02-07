const { tables, getKnex } = require('../data');
const { getLogger } = require('../core/logging');


async function findAll() {
  const users = await getKnex()(tables.user).select().orderBy('id','ASC');
  return users;
}

async function findCount() {
  const [count] = await getKnex()(tables.user).count();
  return count['count(*)'];
}

async function findById(id) {
  const user = await getKnex()(tables.user).where('id',id).first();
  return user;
}

const findByAuth0Id = (auth0id) => {
  return getKnex()(tables.user)
    .where('auth0id', auth0id)
    .first();
};

async function findByEmail(email){
  const user = await getKnex()(tables.user).where('email',email).first();
  return user;
}

const create = async ({
  name,email,auth0id,
}) => {
  try {
    const [id] = await getKnex()(tables.user)
      .insert({
        userName: name,email,auth0id,
      });
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

/**
 * Update a user with the given `id`.
 *
 * @param {number} id - Id of the user to update.
 * @param {object} user - User to save.
 * @param {string} user.name - Name of the user.
 *
 * @returns {Promise<number>} - Id of the updated user.
 */
const updateById = async (id, {
  name,email,auth0id,
}) => {
  try {
    await getKnex()(tables.user)
      .update({
        userName: name,email,auth0id,
      })
      .where('id', id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

/**
 * Update a user with the given `id`.
 *
 * @param {string} id - Id of the user to delete.
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.user)
      .delete()
      .where('id', id);
    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findAll,
  findCount,
  findById,
  findByAuth0Id,
  findByEmail,
  create,
  updateById,
  deleteById,
};