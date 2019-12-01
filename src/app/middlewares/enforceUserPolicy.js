const { jwtHelper } = require('../../helpers');
const User = require('../models/User');

module.exports = async (request, response, next) => {

  try {

    const authorizationHeader = request.headers.authorization;

    const decodedToken = jwtHelper.decode(authorizationHeader);
    const userTokenId = decodedToken.id;

    // Search for valid User
    const userData = await User.findOne({ 'id': userTokenId });

    if (!userData) {
      throw { statusCode: 401 };
    }

    if (request.params.hasOwnProperty('userId')) {

      // Check if token is from User
      if (request.params.userId !== userData.id) {
        throw { statusCode: 403 };
      }
    }

  } catch (error) {
    return response.status(error.statusCode).send({ 'mensagem': 'Não autorizado' });
  }

  return next();
};
