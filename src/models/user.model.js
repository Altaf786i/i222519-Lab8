// In-memory storage for users
const users = [];
let nextUserId = 1;

class User {
  constructor(username, password) {
    this.id = nextUserId++;
    this.username = username;
    this.password = password;
  }

  static findByUsername(username) {
    return users.find(user => user.username === username);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static create(username, password) {
    const user = new User(username, password);
    users.push(user);
    return user;
  }

  static getAll() {
    return users;
  }
}

module.exports = User; 