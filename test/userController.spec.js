const request = require('supertest');
const expect = require('chai').expect;

const jwtHelper = require('../src/helpers/jwt.helper');
const app = require('../src');
const User = require('../src/app/models/User');

describe('User Suite', () => {

  beforeEach(async () => {
    await User.deleteMany({});
  });

  const userData = {
    'nome': 'Jack Nicholson',
    'email': 'jack.nicholson@theshining.com',
    'senha': 'mypassword'
  };

  it('should not return User data without Authorization header on the request', async () => {

    const response = await request(app)
      .get('/users');

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('mensagem', 'Não autorizado');
  });

  it('should not return User data when token has a invalid format', async () => {

    const fakeToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    const response = await request(app)
      .get('/users')
      .set('Authorization', fakeToken);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('mensagem', 'Não autorizado');
  });

  it('should not return User data when token is expired', async () => {

    const userId = '2d510a01-a6b8-46e2-a6a9-601d64426563';

    const response = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${jwtHelper.generate(userId, 0)}`);

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('mensagem', 'Sessão inválida');
  });

  it('should return User data when token is valid and user ID matches', async () => {


    const user = await User.create(userData);
    const userDataWithToken = await User.findOneAndUpdate({ 'id': user.id }, {
      '$set': {
        'token': jwtHelper.generate(user.id)
      }
    },
    {
      'returnNewDocument': true,
      'returnOriginal': false
    });

    const response = await request(app)
      .get(`/users/${userDataWithToken.id}`)
      .set('Authorization', `Bearer ${userDataWithToken.token}`);

    expect(response).to.be.an('Object');
    expect(response.body).to.have.property('id', userDataWithToken.id);
    expect(response.body).to.have.property('nome', userData.nome);
    expect(response.body).to.have.property('email', userData.email);
    expect(response.body).to.have.property('data_criacao');
    expect(response.body).to.have.property('data_atualizacao');
    expect(response.body).to.have.property('ultimo_login');
    expect(response.body).to.have.property('token', userDataWithToken.token);

    expect(response.body).to.not.have.property('senha');
    expect(response.body).to.not.have.property('salt');
  });

  it('should not return User data when token is valid and user ID does NOT match', async () => {

    const user = await User.create(userData);
    const userDataWithToken = await User.findOneAndUpdate({ 'id': user.id }, {
      '$set': {
        'token': jwtHelper.generate(user.id)
      }
    },
    {
      'returnNewDocument': true,
      'returnOriginal': false
    });

    const response = await request(app)
      .get('/users/2d510a01-a6b8-46e2-a6a9-601d64426563')
      .set('Authorization', `Bearer ${userDataWithToken.token}`);

    expect(response.status).to.equal(401);
    expect(response.body).to.be.an('Object');
    expect(response.body).to.has.property('mensagem', 'Não autorizado');
  });
});
