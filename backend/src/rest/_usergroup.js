const Joi = require('joi');
const Router = require('@koa/router');

const {
  hasPermission,
  permissions,
  addUserInfo,
} = require('../core/auth');
const userGroupService = require('../service/userGroup');
const userService = require('../service/user');

const validate = require('./_validation.js');

const getAlluserGroups = async (ctx) => {
  ctx.body = await userGroupService.getAll();
};
getAlluserGroups.validationScheme = null;

const createuserGroup = async (ctx) => {
  let userId = 0;

    try {
      const user = await userService.getByAuth0Id(ctx.state.user.sub);
      userId = user.id;
    } catch (error) {
      await addUserInfo(ctx);
      userId = await userService.register({
        auth0id: ctx.state.user.sub,
        name: ctx.state.user.name,
        email: ctx.state.user.email,
      });
    }

  const newuserGroup = await userGroupService.create({
    userId,
    groupId: Number(ctx.request.body.groupId),
    authorizationLevel: Number(ctx.request.body.authorizationLevel),
    userPulledId: ctx.request.body.userPulledId,
  });
  ctx.body = newuserGroup;
  ctx.status = 201;
};
createuserGroup.validationScheme = {
  body: {
    groupId: Joi.number().integer().positive(),
    authorizationLevel: Joi.number().integer(),
    userPulledId: Joi.number().integer().optional().allow(null),
  },
};

const getuserGroupById = async (ctx) => {
  ctx.body = await userGroupService.getById(ctx.params.id);
};
getuserGroupById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getGroupById = async (ctx) => {
  ctx.body = await userGroupService.getByGroupId(ctx.params.groupId);
};
getGroupById.validationScheme = {
  params: {
    groupId: Joi.number().integer().positive(),
  },
};

const getUserById = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (error) {
    await addUserInfo(ctx);
    userId = await userService.register({
      auth0id: ctx.state.user.sub,
      name: ctx.state.user.name,
      email: ctx.state.user.email,
    });
  }
  ctx.body = await userGroupService.getByUserId(userId);
};
getUserById.validationScheme = null;


const getByUserAndGroupId = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;
  } catch (error) {
    await addUserInfo(ctx);
    userId = await userService.register({
      auth0id: ctx.state.user.sub,
      name: ctx.state.user.name,
      email: ctx.state.user.email,
    });
  }
  ctx.body = await userGroupService.getByUserAndGroupId(userId, ctx.params.groupId);
};
getByUserAndGroupId.validationScheme = {
  params: {
    groupId: Joi.number().integer().positive(),
  },
};

const updateuserGroup = async (ctx) => {
  ctx.body = await userGroupService.updateById(ctx.params.id, {
    ...ctx.request.body,
  });
};
updateuserGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    authorizationLevel: Joi.number().integer(),
    userPulledId: Joi.number().integer().optional().allow(null),
  },
};

const deleteuserGroup = async (ctx) => {
  await userGroupService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteuserGroup.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * Install userGroup routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/userGroups',
  });

  router.get('/', hasPermission(permissions.loggedIn), validate(getAlluserGroups), getAlluserGroups);
  router.post('/', hasPermission(permissions.loggedIn), validate(createuserGroup.validationScheme), createuserGroup);
  router.get('/group/:groupId', hasPermission(permissions.loggedIn), validate(getGroupById.validationScheme), getGroupById);
  router.get('/user/', hasPermission(permissions.loggedIn), validate(getUserById), getUserById);
  router.get('/user/group/:groupId', hasPermission(permissions.loggedIn), validate(getByUserAndGroupId.validationScheme), getByUserAndGroupId);
  router.get('/:id', hasPermission(permissions.loggedIn), validate(getuserGroupById), getuserGroupById);
  router.put('/:id', hasPermission(permissions.loggedIn), validate(updateuserGroup.validationScheme), updateuserGroup);
  router.delete('/:id', hasPermission(permissions.loggedIn), validate(deleteuserGroup.validationScheme), deleteuserGroup);


  app.use(router.routes()).use(router.allowedMethods());
};