const jwt = require('jsonwebtoken');

const jwtHelper = (() => {

  const jwtSecret = process.env.JWT_SECRET;

  /**
   * Verify JWT token
   *
   * @param {String} token JWT token
   * @param {Object} options jwt verify options
   * @returns boolean
   */
  const verifyValidToken = (token, options = {}) => jwt.verify(token, jwtSecret, options, error => (error ? false : true));

  /**
   * Generates JWT token
   *
   * @param {String} id id to be enconded on token
   * @param {Integer} expiresIn time to token expires
   * @returns string
   */
  const generate = (id, expiresIn = 1800) => jwt.sign({ id }, jwtSecret, {
    expiresIn: expiresIn
  });

  /**
   * Validate if token is formatted and signed with the right secret
   *
   * @param {String} token JWT token
   * @returns boolean
   */
  const isSignedToken = token => {

    const splittedToken = token.split(' ');

    if (splittedToken.length !== 2) {
      return false;
    }

    const [scheme, tokenHash] = splittedToken;

    if (!/^Bearer$/i.test(scheme)) {
      return false;
    }

    /*
     * Verify if token contain the correct sign
     * And IGNORE if expired
     */
    return verifyValidToken(tokenHash, { 'ignoreExpiration': true });
  };

  /**
   * Decode token
   *
   * @param {String} token JWT token
   * @return object
   */
  const decode = token => {

    const splittedToken = token.split(' ');

    // Check if is "Bearer TOKEN" or just "TOKEN"
    if (splittedToken.length === 2) {
      return jwt.decode(splittedToken[1]);
    }

    return jwt.decode(token);
  };

  const isExpired = token => {

    if (isSignedToken(token)) {
      return !verifyValidToken(token.split(' ')[1]);
    }

    return true;
  };

  return { generate, isSignedToken, decode, isExpired };

})();

module.exports = jwtHelper;
