const Users = require('../../users');

const users = require('../testData/users');
const personalName = require('../testData/personalName');

test('for getByField personalName', () => {
  expect(new Users(users).getByField('personalName')).toEqual(personalName);
});

const familyName = require('../testData/familyName');

test('for getByField familyName', () => {
  expect(new Users(users).getByField('familyName')).toEqual(familyName);
});

test('for error', () => {
  expect(() => (new Users(users).getByField('abcd'))).toThrow('this property is not found');
});
