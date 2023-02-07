const {
  tables,
  getKnex,
} = require('../data/index');
const {
  getLogger,
} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.usergroup}.id`, 'authorizationLevel', 'userPulledId',
  `${tables.user}.id as userId`, `${tables.user}.userName as userName`, `${tables.user}.email as email`,
  `${tables.groups}.id as groupId`, `${tables.groups}.name as groupName`, `${tables.groups}.maxPrice as price`,
  `${tables.groups}.namesDrawn as namesDrawn`, `${tables.groups}.code as code`,
];


const findAll = async () => {
  const userGroups = await getKnex()(tables.usergroup).select(SELECT_COLUMNS)
    .join(tables.user, `${tables.usergroup}.userId`, '=', `${tables.user}.id`)
    .join(tables.groups, `${tables.usergroup}.groupId`, '=', `${tables.groups}.id`)
    .orderBy('id', 'ASC');

  return userGroups;
};

const findCount = async () => {
  const [count] = await getKnex()(tables.usergroup).count();
  return count['count(*)'];
};

const findById = async (id) => {
  const userGroup = await getKnex()(tables.usergroup).select(SELECT_COLUMNS).where(`${tables.usergroup}.id`, id)
    .join(tables.user, `${tables.usergroup}.userId`, '=', `${tables.user}.id`)
    .join(tables.groups, `${tables.usergroup}.groupId`, '=', `${tables.groups}.id`).first();

  return userGroup;
};

const findByGroupId = async (id) => {
  const userGroups = await getKnex()(tables.usergroup).select(SELECT_COLUMNS).where('groupId', id)
    .join(tables.user, `${tables.usergroup}.userId`, '=', `${tables.user}.id`)
    .join(tables.groups, `${tables.usergroup}.groupId`, '=', `${tables.groups}.id`);

  return userGroups;
};

const findByUserId = async (id) => {
  const userGroups = await getKnex()(tables.usergroup).select(SELECT_COLUMNS).where('userId', id)
    .join(tables.user, `${tables.usergroup}.userId`, '=', `${tables.user}.id`)
    .join(tables.groups, `${tables.usergroup}.groupId`, '=', `${tables.groups}.id`);

  return userGroups;
};

const findByUserAndGroupId = async (userId, groupId) => {
  const userGroup = await getKnex()(tables.usergroup).select(SELECT_COLUMNS).where('userId', userId).andWhere('groupId', groupId)
    .join(tables.user, `${tables.usergroup}.userId`, '=', `${tables.user}.id`)
    .join(tables.groups, `${tables.usergroup}.groupId`, '=', `${tables.groups}.id`);
  return userGroup;
};

const create = async ({
  userId,
  groupId,
  authorizationLevel,
  userPulledId,
}) => {
  try {
    const [id] = await getKnex()(tables.usergroup)
      .insert({
        userId,
        groupId,
        authorizationLevel,
        userPulledId,
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
  authorizationLevel,
  userPulledId,
}) => {
  try {
    await getKnex()(tables.usergroup)
      .update({
        authorizationLevel: authorizationLevel,
        userPulledId: userPulledId,
      })
      .where(`${tables.usergroup}.id`, id);
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
    const rowsAffected = await getKnex()(tables.usergroup)
      .delete()
      .where(`${tables.usergroup}.id`, id);
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
  findByGroupId,
  findByUserId,
  findByUserAndGroupId,
  create,
  updateById,
  deleteById,
};