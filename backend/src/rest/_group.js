const Joi = require('joi');
const Router = require('@koa/router');

const {
  hasPermission,
  permissions,
} = require('../core/auth');
const groupService = require('../service/group');

const validate = require('./_validation.js');

const getAllGroups = async (ctx) => {
  ctx.body = await groupService.getAll();
};
getAllGroups.validationScheme = null;

const createGroup = async (ctx) => {
  const newGroup = await groupService.create(ctx.request.body);
  ctx.body = newGroup;
  ctx.status = 201;
};
createGroup.validationScheme = {
  body: {
    name: Joi.string().max(255),
    maxPrice: Joi.number().integer().optional(),
  },
};

const getGroupById = async (ctx) => {
  ctx.body = await groupService.getById(ctx.params.id);
  ctx.status = 200;
};
getGroupById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getGroupByCode = async (ctx) => {

  ctx.body = await groupService.getByCode(ctx.params.code);
};
getGroupByCode.validationScheme = {
  params: {
    code: Joi.string(),
  },
};

const updateGroup = async (ctx) => {
  ctx.body = await groupService.updateById(ctx.params.id, ctx.request.body);
  ctx.status = 200;
};

updateGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    name: Joi.string().max(255),
    maxPrice: Joi.number().positive(),
    namesDrawn: Joi.boolean(),
  },
};

const deleteGroup = async (ctx) => {
  await groupService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/groups',
  });

  router.get('/', hasPermission(permissions.loggedIn), validate(getAllGroups.validationScheme), getAllGroups);
  router.get('/code/:code', hasPermission(permissions.loggedIn), validate(getGroupByCode.validationScheme), getGroupByCode);
  router.post('/', hasPermission(permissions.loggedIn), validate(createGroup.validationScheme), createGroup);
  router.get('/:id', hasPermission(permissions.loggedIn), validate(getGroupById.validationScheme), getGroupById);
  router.put('/:id', hasPermission(permissions.loggedIn), validate(updateGroup.validationScheme), updateGroup);
  router.delete('/:id', hasPermission(permissions.loggedIn), validate(deleteGroup.validationScheme), deleteGroup);

  app.use(router.routes()).use(router.allowedMethods());
};