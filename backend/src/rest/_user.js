const Joi = require('joi');
const Router = require('@koa/router');

const {
  hasPermission,
  permissions,
  addUserInfo,
} = require('../core/auth');
const userService = require('../service/user');

const validate = require('./_validation');

const getAllUsers = async (ctx) => {
  const users = await userService.getAll();
  ctx.body = users;
};
getAllUsers.validationScheme = null;

const getUserById = async (ctx) => {
  let userId = 0;
  if (ctx.params.id === 0) {
    try {
      const user = await userService.getByAuth0Id(ctx.state.user.sub);
      userId = user.id;
    } catch (err) {
      await addUserInfo(ctx);
      userId = await userService.register({
        auth0id: ctx.state.user.sub,
        name: ctx.state.user.name,
        email: ctx.state.user.email,
      });
    }
  } else {
    userId = ctx.params.id;
  }
  const user = await userService.getById(userId);
  ctx.body = user;
};
getUserById.validationScheme = {
  params: {
    id: Joi.number().integer(),
  },
};

const getCurrentUser = async (ctx) => {
  const user = await userService.getByAuth0Id(ctx.state.user.sub);
  ctx.body = user;
};
getCurrentUser.validationScheme = null;

const getUserByEmail = async (ctx) => {
  const user = await userService.getByEmail(ctx.params.email);
  ctx.body = user;
};
getUserByEmail.validationScheme = {
  params: {
    email: Joi.string().max(512),
  },
};

const updateUserById = async (ctx) => {
  const user = await userService.updateById(ctx.params.id, ctx.request.body);
  ctx.body = user;
};
updateUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    name: Joi.string().max(255),
    email: Joi.string().max(512),
  },
};

const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
};
deleteUserById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

/**
 * Install user routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: '/users',
  });

  router.get('/', hasPermission(permissions.loggedIn), validate(getAllUsers.validationScheme), getAllUsers);
  router.get('/current',hasPermission(permissions.loggedIn), validate(getCurrentUser.validationScheme), getCurrentUser);
  router.get('/:id', hasPermission(permissions.loggedIn), validate(getUserById.validationScheme), getUserById);
  router.get('/email/:email', hasPermission(permissions.loggedIn), validate(getUserByEmail.validationScheme), getUserByEmail);
  router.put('/:id', hasPermission(permissions.loggedIn), validate(updateUserById.validationScheme), updateUserById);
  router.delete('/:id', hasPermission(permissions.loggedIn), validate(deleteUserById.validationScheme), deleteUserById);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};