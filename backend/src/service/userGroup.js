const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');
const userGroupRepo = require('../repository/usergroup');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all userGroups');
  const items = await userGroupRepo.findAll();
  const count = await userGroupRepo.findCount();
  return {
    items,
    count,
  };
};

const getById = async (id) => {
  debugLog(`Fething userGroup with id ${id}`);
  const userGroup = await userGroupRepo.findById(id);

  if (!userGroup) {
    throw ServiceError.notFound(`There is no userGroup with id ${id}`, {
      id,
    });
  }

  return userGroup;
};

const getByGroupId = async (id) => {
  debugLog(`Fetching group with id ${id}`);
  const groups = await userGroupRepo.findByGroupId(id);

  if (!groups) {
    throw ServiceError.notFound(`There is no group with id ${id}`, {
      id,
    });
  }

  return groups;
};

const getByUserId = async (id) => {
  debugLog(`Fetching user with id ${id}`);
  const user = await userGroupRepo.findByUserId(id);

  if (!user) {
    throw ServiceError.notFound(`There is no user with id ${id}`, {
      id,
    });
  }

  return user;
};

const getByUserAndGroupId = async (userId, groupId) => {
  debugLog(`Fetching userGroup with userId ${userId} and groupId ${groupId}`);
  const userGroup = await userGroupRepo.findByUserAndGroupId(userId, groupId);

  if (!userGroup) {
    throw ServiceError.notFound(`There is no userGroup with userId ${userId} and groupId ${groupId}`, {
      userId,
      groupId,
    });
  }
  return userGroup;
};




const create = async ({
  userId,
  groupId,
  authorizationLevel,
  userPulledId,
}) => {
  debugLog('Creating new userGroup', {
    userId,
    groupId,
    authorizationLevel,
    userPulledId,
  });

  const id = await userGroupRepo.create({
    userId,
    groupId,
    authorizationLevel,
    userPulledId,
  });
  const usergroup = await getById(id);
  return usergroup;
};

const updateById = async (id, {
  authorizationLevel,
  userPulledId,
}) => {
  debugLog(`Updating userGroup with id ${id}`, {
    authorizationLevel,
    userPulledId,
  });
  await userGroupRepo.updateById(id, {
    authorizationLevel,
    userPulledId,
  });
  const usergroup = await getById(id);
  return usergroup;
};

const deleteById = async (id) => {
  debugLog(`Deleting userGroup with id ${id}`);
  await userGroupRepo.deleteById(id);
};

module.exports = {
  getAll,
  getById,
  getByGroupId,
  getByUserId,
  getByUserAndGroupId,
  create,
  updateById,
  deleteById,
};