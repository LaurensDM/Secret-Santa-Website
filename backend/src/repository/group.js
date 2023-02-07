const {
  tables,
  getKnex,
} = require('../data/index');
const {
  getLogger,
} = require('../core/logging');

const findAll = async () => {
  const groups = await getKnex()(tables.groups).select().orderBy('name', 'ASC');
  return groups;
};

// const findByName = (name) => {
//   return getKnex()(tables.groups).where('name', name).first();
// }

const findById = async (id) => {
  const group = await getKnex()(tables.groups).where('id', id).first();
  return group;
};

const findCount = async () => {
  const [count] = await getKnex()(tables.groups).count();
  return count['count(*)'];
};

const findByCode = async (code) => {
  const group = await getKnex()(tables.groups).where('code', code).first();
  return group;
};

const create = async ({
  name,
  maxPrice,
  code,
}) => {
  try {
    const [id] = await getKnex()(tables.groups).insert({
      name,
      maxPrice,
      namesDrawn: false,
      code,
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
  name,
  maxPrice,
  namesDrawn,
}) => {
  try {
    await getKnex()(tables.groups).update({
      name,
      maxPrice,
      namesDrawn,
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
    const rowsAffected = await getKnex()(tables.groups).delete().where('id', id);
    return rowsAffected;
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
  findById,
  findCount,
  findByCode,
  create,
  updateById,
  deleteById,
};