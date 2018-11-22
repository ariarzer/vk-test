class Users {
  constructor(users) {
    this.users = users;
  }

  getByField(Key) {
    const result = {};
    Object.keys(this.users).forEach((key) => {
      if (!this.users[key][Key]) {
        throw new Error('this property is not found');
      }
      result[key] = this.users[key][Key];
    });
    return result;
  }
}

module.exports = Users;
