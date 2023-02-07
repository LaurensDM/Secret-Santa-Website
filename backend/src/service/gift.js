const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');
const giftRepo = require('../repository/gift');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all gifts');
  const items = await giftRepo.findAll();
  const count = await giftRepo.findCount();
  return {items, count};
};

const getFromUserByGroup = async (userId, groupId) => {
  debugLog(`Fetching gifts from user with userId ${userId} and groupId ${groupId}`);
  const gift = await giftRepo.findAllOfUserByGroup(userId, groupId);
  return gift;
};

const getById = async (id) => {
  debugLog(`Fetching gift with id ${id}`);
  const gift = await giftRepo.findById(id);
  if (!gift) {
    throw ServiceError.notFound(`There is no gift with id ${id}`, {
      id,
    });
  }
  return gift;
};

const create = async (filename,{
  description,
  price,
  link,
  groupId,
  userId,
}) => {
  const newGift = {
    filename,
    description,
    price,
    link,
    userId,
    groupId,
  };
  debugLog('Creating new gift', newGift);
  const id = await giftRepo.create(newGift);
  const gift = await getById(id);
  return gift;
};

const updateById = async (id,filename,{
  description,
  price,
  link,
  groupId,
}) => {
  const updatedGift = {
    filename,
    description,
    price,
    link,
    groupId,
  };
  debugLog(`Updating gift with id ${id}`, updatedGift);
  await giftRepo.updateById(id, updatedGift);
  const gift = await getById(id);
  return gift;
};

const deleteById = async (id) => {
  debugLog(`Deleting gift with id ${id}`);
  await giftRepo.deleteById(id);
};

module.exports = {
  getAll,
  getFromUserByGroup,
  getById,
  create,
  updateById,
  deleteById,
};