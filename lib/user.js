
/**
 * Module dependencies.
 */

var db = require('./db');
var wrap = require('co-monk');

/**
 * Expose `User`.
 */

module.exports = User;

/**
 * Upsert `user`.
 */

User.update = function *(user) {
  return yield this.insert(user);
};
