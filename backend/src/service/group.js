const {
  getLogger,
} = require('../core/logging');
const ServiceError = require('../core/serviceError');
const groupRepo = require('../repository/group');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog('Fetching all groups');
  const items = await groupRepo.findAll();
  const count = await groupRepo.findCount();
  return {
    items,
    count,
  };
};

const getById = async (id) => {
  debugLog(`Fetching group with id ${id}`);
  const group = await groupRepo.findById(id);

  if (!group) {
    throw ServiceError.notFound(`There is no group with id ${id}`, {
      id,
    });
  }

  return group;
};

const getByCode = async (code) => {
  debugLog(`Fetching groups with code ${code}`);
  const group = await groupRepo.findByCode(code);

  if (!group) {
    throw ServiceError.notFound(`There is no group with code ${code}`, {
      code,
    });
  }

  return group;
};

const create = async ({
  name,
  maxPrice,
}) => {
  const code = Date.now() + makeid(4);
  debugLog('Creating new group', {
    name,
    maxPrice,
    code,
  });

  const id = await groupRepo.create({
    name,
    maxPrice,
    code,
  });
  const group = await getById(id);
  return group;
};

const updateById = async (id, {
  name,
  maxPrice,
  namesDrawn,
}) => {
  debugLog(`Updating group with id ${id}`, {
    name,
    maxPrice,
    namesDrawn,
  });

  await groupRepo.updateById(id, {
    name,
    maxPrice,
    namesDrawn,
  });
  const group = await getById(id);
  return group;
};

const deleteById = async (id) => {
  debugLog(`Deleting group with id ${id}`);
  await groupRepo.deleteById(id);
};

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


module.exports = {
  getAll,
  getById,
  getByCode,
  create,
  updateById,
  deleteById,
};