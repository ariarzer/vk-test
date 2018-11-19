const Users = require('../../users');

const users = require('../testData/users');
const personalName = require('../testData/personalName');

test('for get personalName', () => {
  expect(new Users(users).get('personalName')).toEqual(personalName);
});

const familyName = require('../testData/familyName');

test('for get familyName', () => {
  expect(new Users(users).get('familyName')).toEqual(familyName);
});

test('for error', () => {
  expect(() => (new Users(users).get('abcd'))).toThrow('this property is not found');
});
