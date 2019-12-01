const express = require('express');
const router = express.Router();

const authorizationMiddleware = require('../middlewares/authorization');
const enforceUserPolicy = require('../middlewares/enforceUserPolicy');

router.use(authorizationMiddleware);
router.use(enforceUserPolicy);

const { decoratorHelper } = require('../../helpers');
const User = require('../models/User');

router.get('/:userId', async (request, response) => {

  try {

    if (!request.params.hasOwnProperty('userId')) {
      throw { statusCode: 400 };
    }

    const userData = await User.findOne({ 'id': request.params.userId });
    if (!userData) {
      throw { statusCode: 401 };
    }
    return response.send(decoratorHelper.wrapper('user', userData));
  } catch (error) {
    return response.status(error.statusCode).send({ 'mensagem': 'Não autorizado' });
  }
});

module.exports = app => app.use('/users', router);
