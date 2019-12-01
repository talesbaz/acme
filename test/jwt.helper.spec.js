const expect = require('chai').expect;

const jwtHelper = require('../src/helpers/jwt.helper');

describe('JWT Suite', () => {

  describe('generate Suite', () => {

    it('should generate a jwt token', () => {

      const token = jwtHelper.generate('2d510a01-a6b8-46e2-a6a9-601d64426563');

      expect(token).to.be.an('string');
    });
  });

  describe('isSignedToken Suite', () => {

    it('should return true when token is well formatted', () => {

      const token = jwtHelper.generate('2d510a01-a6b8-46e2-a6a9-601d64426563');

      const isFormatted = jwtHelper.isSignedToken(`Bearer ${token}`);
      expect(isFormatted).to.be.true;
    });

    it('should return false when token is not formatted', () => {

      const isFormatted = jwtHelper.isSignedToken('MY_TOKEN');
      expect(isFormatted).to.be.false;
    });

    it('should return false when token is not signed with correct secret', () => {

      const fakeToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      const isFormatted = jwtHelper.isSignedToken(fakeToken);
      expect(isFormatted).to.be.false;
    });
  });

  describe('decode Suite', () => {

    it('should return user id when token is valid', () => {

      const userId = '2d510a01-a6b8-46e2-a6a9-601d64426563';
      const token = jwtHelper.generate(userId);

      const response = jwtHelper.decode(token);

      expect(response).to.be.an('object');
      expect(response.id).to.be.equal(userId);
    });
  });

  describe('isExpired Suite', () => {

    it('should return TRUE when the token is expired', () => {

      const token = jwtHelper.generate('2d510a01-a6b8-46e2-a6a9-601d64426563', 0);
      const isExpired = jwtHelper.isExpired(`Bearer ${token}`);

      expect(isExpired).to.be.an('Boolean');
      expect(isExpired).to.be.true;
    });

    it('should return FALSE when the token is expired', () => {

      const token = jwtHelper.generate('2d510a01-a6b8-46e2-a6a9-601d64426563');
      const isExpired = jwtHelper.isExpired(`Bearer ${token}`);

      expect(isExpired).to.be.an('Boolean');
      expect(isExpired).to.be.false;
    });
  });

});
