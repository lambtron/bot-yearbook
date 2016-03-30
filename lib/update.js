
/**
 * Module dependencies.
 */

var User = require('./user');
// var Keywords = require('./keywords');
var co = require('co');

/**
 * When a new message is sent.
 */

exports.newMessage = function *newMessage(bot, message) {
  var load = parse(message.text);
  var user = yield User.find({ userId: message.user });
  user.messages.words += load.numWords;
  user.messages.messages += load.numMessages;
  user.messages.characters += load.numCharacters;
  user.emojis = merge(user.emojis, load.emojis);
  user.messages.keywords = merge(user.messages.keywords, load.keywords);
  user.messages.domains = merge(user.messages.domains, load.domains);
  return yield User.upsert({ userId: message.user }, user);
};

/**
 * When a new emoji is added.
 */

exports.newReaction = function newReaction(bot, message) {
  console.log(message);
};

/**
 * Helper function to parse messages.
 */

function parse(message) {
  var ret = {};
  message = message || '';
  ret.numWords = countWords(message);
  ret.numCharacters = countChars(message);
  ret.numMessages = 1;
  ret.emojis = countEmojis(message);
  ret.domains = countDomains(message);
  ret.keywords = countKeywords(message);
  return ret;
}

/**
 * Count the number of words in a message.
 */

function countWords(message) {
  return message.split(' ').length
}

/**
 * Count the number of characters in a message.
 */

function countChars(message) {
  return message.replace(/[^A-Z]/gi, '').length;
}

/**
 * Count and categorize emojis in a message.
 */

function countEmojis(message) {
  var ret = {};
  var re = /([:'])(?:(?=(\\?))\2.)*?\1/g;
  var emojis = message.match(re);
  for (var i = 0; i < emojis.length; i++) {
    if (!ret[emojis[i]]) ret[emojis[i]] = 0;
    ret[emojis[i]] += 1;
  }
  return ret;
}

/**
 * Count domains.
 */

function countDomains(message) {
  var ret = {};
  var re = /\<(.*?)\|/g;
  var domains = message.match(re);
  for (var i = 0; i < domains.length; i++) {
    var domain = domains[i].substring(1, domains[i].length - 1);
    if (!ret[domain]) ret[domain] = 0;
    ret[domain] += 1;
  }
  return ret;
}

/**
 * Count keywords
 */

function countKeywords(message) {
  // TODO.
  // pull keywords from keyword database????
  // or keywords could be a yaml file somewhere
  // keywords could be read from the awards file
  var ret = {};
  return ret;
}

/**
 * Merge objects.
 */

function merge(a, b) {
  var ret = {};
  Object.keys(a).forEach(function(key, index) {
    ret[key] = a[key];
    if (b[key]) {
      ret[key] += b[key];
      b[key] = undefined;
    }
  });
  Object.keys(b).forEach(function(key, index) {
    if (b[key]) ret[key] = b[key];
  });
  return ret;
}
