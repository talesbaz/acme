const expect = require('chai').expect;

const uuidHelper = require('../src/helpers/uuid.helper');

describe('UUID Suite', () => {

  it('should generate a uuid identifier', () => {

    const uuid = uuidHelper.generate('5de18ee1f2288e0c13cc9387');

    expect(uuid).to.be.an('string');
  });

});
