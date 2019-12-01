const decoratorHelper = (() => {

  /**
   * Wrapper data by type
   *
   * @param {String} type type of content
   * @param {Object} data data to be wrapped
   * @returns object
   */
  const wrapper = (type, data) => {

    const contents = {
      'user': data => ({
        'id': data.id,
        'nome': data.nome,
        'email': data.email,
        'data_criacao': data.data_criacao,
        'data_atualizacao': data.data_atualizacao || null,
        'ultimo_login': data.ultimo_login,
        'token': data.token
      })
    };

    if (!contents[type]) {
      return {};
    }

    return contents[type](data);
  };

  return { wrapper };
})();

module.exports = decoratorHelper;
