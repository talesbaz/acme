const uuidv5 = require('uuid/v5');

const uuidHelper = (() => {

  const uuidNamespace = process.env.UUID_NAMESPACE;

  /**
   * Generates UUID identifier
   *
   * @param {Any} content content to generate namespaced UUID
   * @returns string
   */
  const generate = content => uuidv5(content, uuidNamespace);

  return { generate };
})();

module.exports = uuidHelper;
