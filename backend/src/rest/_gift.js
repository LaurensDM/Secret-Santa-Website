const Joi = require('joi');
const Router = require('@koa/router');
const multer = require('@koa/multer');

const {
  hasPermission,
  permissions,
  addUserInfo,
} = require('../core/auth');
const giftService = require('../service/gift');
const userService = require('../service/user');

const validate = require('./_validation.js');

var imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(null, Error('only image is allowed'));
  }

};

const maxSize = 5 * 1000 * 1000;
const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
  limits: {
    fileSize: maxSize,
  },
});

const getAllGifts = async (ctx) => {
  ctx.body = await giftService.getAll();
};
getAllGifts.validationScheme = null;

const createGift = async (ctx) => {
  let userId = 0;
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

  const filename = ctx.request.file ? ctx.request.file.filename : null;

  const newGift = await giftService.create(filename, {
    ...ctx.request.body,
    userId,
  });
  ctx.body = newGift;
  ctx.status = 201;
};
createGift.validationScheme = {
  body: {
    image: Joi.optional(),
    description: Joi.string().max(512),
    price: Joi.number().optional(),
    link: Joi.string().max(512),
    groupId: Joi.number().integer().positive(),
  },

};

const getGiftById = async (ctx) => {
  ctx.body = await giftService.getById(ctx.params.id);
  ctx.status = 200;
};
getGiftById.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

const getGiftFromUserByGroup = async (ctx) => {
  let userId = 0;
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

  ctx.body = await giftService.getFromUserByGroup(ctx.params.userId ? ctx.params.userId : userId, ctx.params.groupId);
};
getGiftFromUserByGroup.validationScheme = {
  params: {
    userId: Joi.number().integer().optional(),
    groupId: Joi.number().integer().positive(),
  },
};

const updateGift = async (ctx) => {
  const filename = ctx.request.file ?  ctx.request.file.filename : null;
  ctx.body = await giftService.updateById(ctx.params.id, filename, ctx.request.body);
  ctx.status = 200;
};
updateGift.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
  body: {
    image: Joi.optional(),
    description: Joi.string().max(512),
    price: Joi.number().optional(),
    link: Joi.string().max(512),
    groupId: Joi.number().integer().positive(),
  },
};

const deleteGift = async (ctx) => {
  await giftService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteGift.validationScheme = {
  params: {
    id: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/gifts',
  });

  router.get('/', hasPermission(permissions.loggedIn), validate(getAllGifts.validationScheme), getAllGifts);
  router.get('/group/:groupId/user/:userId', hasPermission(permissions.loggedIn), validate(getGiftFromUserByGroup.validationScheme), getGiftFromUserByGroup);
  router.post('/', hasPermission(permissions.loggedIn), upload.single('image'), validate(createGift.validationScheme), createGift);
  router.get('/:id', hasPermission(permissions.loggedIn), validate(getGiftById.validationScheme), getGiftById);
  router.put('/:id', hasPermission(permissions.loggedIn), upload.single('image'), validate(updateGift.validationScheme), updateGift);
  router.delete('/:id', hasPermission(permissions.loggedIn), validate(deleteGift.validationScheme), deleteGift);

  app.use(router.routes()).use(router.allowedMethods());
};