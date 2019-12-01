const express = require('express');
const Joi = require('joi');

const router = express.Router();

const { cryptoHelper, jwtHelper, decoratorHelper } = require('../../helpers');
const User = require('../models/User');

/**
 *  Find one user by Id, update and return new
 *
 * @param {Object} user User instance
 * @param {Object} update set of properties for update
 * @fixme provide a better name
 * @returns object
 */
const findOneAndUpdateAndReturnNew = async (user, update) => await User.findOneAndUpdate({ 'id': user.id }, {
  '$set': update
},
{
  'returnNewDocument': true,
  'returnOriginal': false
});

router.post('/signup', async (request, response) => {

  const { email } = request.body;

  try {

    const schema = Joi.object().keys({
      'nome': Joi.string().required(),
      'email': Joi.string().email().required(),
      'senha': Joi.string().required()
    });

    const validation = Joi.validate(request.body, schema);
    if (validation.error) {
      throw new Error(validation.error);
    }

    if (await User.findOne({ email })) {
      throw new Error('E-mail já existente');
    }

    const user = await User.create(request.body);
    const userDataWithToken = await findOneAndUpdateAndReturnNew(user, {
      'token': jwtHelper.generate(user.id)
    });

    return response.send(decoratorHelper.wrapper('user', userDataWithToken));
  } catch (error) {
    return response.status(400).send({ 'mensagem': error.message });
  }
});

router.post('/signin', async (request, response) => {

  try {

    const { email, senha } = request.body;

    const schema = Joi.object().keys({
      'email': Joi.string().email().required(),
      'senha': Joi.string().required()
    });

    const validation = Joi.validate(request.body, schema);
    if (validation.error) {
      throw { 'statusCode': 400, 'message': new Error(validation.error).message };
    }

    const user = await User.findOne({ email }).select(['+senha', '+salt']);

    if (!user) {
      throw { 'statusCode': 400, 'message': 'Usuário e/ou senha inválidos' };
    }

    if (!cryptoHelper.compare(senha, user.senha, user.salt)) {
      throw { 'statusCode': 401, 'message': 'Usuário e/ou senha inválidos'  };
    }

    // Update User last login and return new token
    const userData = await findOneAndUpdateAndReturnNew(user, {
      'token': jwtHelper.generate(user.id),
      'ultimo_login': new Date(),
      'data_atualizacao': new Date()
    });

    return response.send(decoratorHelper.wrapper('user', userData));

  } catch (error) {
    return response.status(error.statusCode || 400).send({ 'mensagem': error.message });
  }
});

module.exports = app => app.use('/auth', router);
