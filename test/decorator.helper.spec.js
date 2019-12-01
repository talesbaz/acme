const expect = require('chai').expect;

const decoratorHelper = require('../src/helpers/decorator.helper');

describe('Decorator Suite', () => {

  it('should return empty object when type is invalid', () => {

    const response = decoratorHelper.wrapper('ACCOUNT');

    expect(response).to.be.an('Object', {});
  });

  it('should return a object when the type is valid', () => {

    const data = {
      'id': '123',
      'nome': 'Rick',
      'email': 'rick@peaceamongworlds.com',
      'data_criacao': new Date(),
      'data_atualizacao': null,
      'ultimo_login': new Date(),
      'token': 'token'
    };
    const response = decoratorHelper.wrapper('user', data);

    expect(response).to.be.an('Object');
    expect(response).to.have.property('id', data.id);
    expect(response).to.have.property('nome', data.nome);
    expect(response).to.have.property('email', data.email);
    expect(response).to.have.property('data_criacao', data.data_criacao);
    expect(response).to.have.property('data_atualizacao', data.data_atualizacao);
    expect(response).to.have.property('ultimo_login', data.ultimo_login);
    expect(response).to.have.property('token', data.token);
  });

});
