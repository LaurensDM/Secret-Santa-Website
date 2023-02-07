const {
  tables,
  getKnex,
} = require('../data/index');
const {
  getLogger,
} = require('../core/logging');

// const SELECT_COLUMNS = [
//   `${tables.gifts}.id`, 'image','description','price','link',
//   `${tables.user}.id as userId`,`${tables.groups}.id as groupId`, `${tables.groups}.maxPrice as maxPrice`,
// ];

const findAll = async () => {
  const gifts = await getKnex()(tables.gifts).select().orderBy('id', 'ASC');
  return gifts;
};

const findCount = async () => {
  const [count] = await getKnex()(tables.gifts).count();
  return count['count(*)'];
};

const findAllOfUserByGroup = async (userId, groupId) => {
  const gifts = await getKnex()(tables.gifts).where('userId', userId)
  .andWhere('groupId',groupId);
  return gifts;
};

const findById = async (id) => {
  const gift = await getKnex()(tables.gifts).where('id', id)
  .first();
  return gift;
};

const create = async (
  {
    filename,
    description,
    price,
    link,
    userId,
    groupId,
  }) => {
  try {
    const [id] = await getKnex()(tables.gifts).insert({
      image: filename,
      description,
      price,
      link,
      userId,
      groupId,
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

const updateById = async (id, {
  filename,
  description,
  price,
  link,
  groupId,
}) => {
  try {
    await getKnex()(tables.gifts).update({
      image: filename,
      description,
      price,
      link,
      groupId,
    }).where('id', id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.gifts).delete().where('id', id);
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
  findAllOfUserByGroup,
  create,
  findById,
  updateById,
  deleteById,
};