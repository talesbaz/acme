const expect = require('chai').expect;

const cryptoHelper = require('../src/helpers/crypto.helper');

describe('Crypto Suite', () => {

  const contentToEncrypt = 'peace_among_worlds';

  it('should create a 256 hash based on a given string parameter', () => {

    const hashedContent = cryptoHelper.encrypt(contentToEncrypt);

    expect(hashedContent).to.be.an('object');
    expect(hashedContent).to.have.property('hash');
    expect(hashedContent).to.have.property('salt');
  });

  it('should return true when plain content matches with encrypted content', () => {

    const hashedContent = cryptoHelper.encrypt(contentToEncrypt);
    const isValid = cryptoHelper.compare(contentToEncrypt, hashedContent.hash, hashedContent.salt);

    expect(isValid).to.be.true;
  });

  it('should return false when plain content does not match with encrypted content', () => {

    const hashedContent = cryptoHelper.encrypt('war_among_worlds');
    const isValid = cryptoHelper.compare(contentToEncrypt, hashedContent.hash, hashedContent.salt);

    expect(isValid).to.be.false;
  });

});
