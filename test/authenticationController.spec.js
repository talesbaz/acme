const request = require('supertest');
const expect = require('chai').expect;

const app = require('../src/');
const User = require('../src/app/models/User');

describe('Authentication suite', () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  const userData = {
    'nome': 'Jack Nicholson',
    'email': 'jack.nicholson@theshining.com',
    'senha': 'mypassword'
  };

  describe('Sign up suite', () => {

    it('should return user data inserted when the request body is valid', async () => {

      const response = await request(app)
        .post('/auth/signup')
        .send(userData);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('nome', userData.nome);
      expect(response.body).to.have.property('email', userData.email);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('data_criacao');
      expect(response.body).to.have.property('data_atualizacao', null);
      expect(response.body).to.have.property('ultimo_login');

      expect(response.body).not.have.property('senha');
    });

    it('should not create a user when e-mail already exists', async () => {

      await request(app)
        .post('/auth/signup')
        .send(userData);

      const response = await request(app)
        .post('/auth/signup')
        .send(userData);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('mensagem', 'E-mail já existente');
    });

  });

  describe('Sign in suite', () => {

    it('should return user data when user credentials are correct', async () => {

      // Create user
      await request(app)
        .post('/auth/signup')
        .send(userData);

      const response = await request(app)
        .post('/auth/signin')
        .send({
          'email': userData.email,
          'senha': userData.senha
        });

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('id');
      expect(response.body).to.have.property('nome', userData.nome);
      expect(response.body).to.have.property('email', userData.email);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('data_criacao');
      expect(response.body).to.have.property('data_atualizacao');
      expect(response.body).to.have.property('ultimo_login');

      expect(response.body).not.have.property('senha');
    });

    it('should not return user data when user password is incorret', async () => {

      // Create user
      await request(app)
        .post('/auth/signup')
        .send(userData);

      const response = await request(app)
        .post('/auth/signin')
        .send({
          'email': userData.email,
          'senha': 'wrongpassword'
        });

      expect(response.status).to.equal(401);
      expect(response.body).to.have.property('mensagem', 'Usuário e/ou senha inválidos');
    });

    it('should not return user data when user email is incorret', async () => {

      // Create user
      await request(app)
        .post('/auth/signup')
        .send(userData);

      const response = await request(app)
        .post('/auth/signin')
        .send({
          'email': 'rick@peaceamongworlds.com',
          'senha': userData.senha
        });

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('mensagem', 'Usuário e/ou senha inválidos');
    });
  });
});
