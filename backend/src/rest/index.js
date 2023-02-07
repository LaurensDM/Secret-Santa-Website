const path = require('path');

const Router = require('@koa/router');
const serve = require('koa-static');

const installGiftRouter = require('./_gift');
const installHealthRouter = require('./_health');
const installGroupRouter = require('./_group');
const installUserRouter = require('./_user');
const installUserGroupRouter = require('./_usergroup');

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });
  
  installGiftRouter(router);
  installGroupRouter(router);
  installHealthRouter(router);
  installUserRouter(router);
  installUserGroupRouter(router);

  app.use(serve(path.join(__dirname, '../../uploads')));

  app.use(router.routes()).use(router.allowedMethods());
};