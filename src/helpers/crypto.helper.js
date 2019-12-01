const crypto = require('crypto');

const cryptoHelper = (() => {

  /**
   * Generates random string to use as salt to hash
   */
  const generateRandomSalt = () => crypto.randomBytes(15).toString('hex');

  /**
   * Encrypt content using random salt
   *
   * @param {String} content content to hash
   * @returns object
   */
  const encrypt = content => {

    const salt = generateRandomSalt();
    return {
      'hash': crypto.createHash('sha512', salt).update(content, 'binary').digest('base64'),
      'salt': salt
    };
  };

  /**
   * Compare content against the hash
   *
   * @param {String} content content to validate against the hash
   * @param {String} hashToCompare hash to compare
   * @param {String} salt salt to be applied to content
   * @returns boolean
   */
  const compare = (content, hashToCompare, salt) => (crypto.createHash('sha512', salt).update(content.toString(), 'binary').digest('base64') === hashToCompare ? true : false);

  return { encrypt, compare };
})();

module.exports = cryptoHelper;
