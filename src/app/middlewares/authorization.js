const { jwtHelper } = require('../../helpers');

module.exports = (request, response, next) => {

  try {

    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new Error('Não autorizado');
    }

    if (!jwtHelper.isSignedToken(authorizationHeader)) {
      throw new Error('Não autorizado');
    }

    if (jwtHelper.isExpired(authorizationHeader)) {
      throw new Error('Sessão inválida');
    }

    return next();

  } catch (error) {
    return response.status(401).send({ 'mensagem': error.message });
  }
};
