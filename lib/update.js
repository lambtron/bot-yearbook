
/**
 * Module dependencies.
 */

var User = require('./user');

/**
 * When a new message is sent.
 */

exports.newMessage = function newMessage(bot, message) {
  // parse message
  // update DB accordingly
  //
  console.log(message);

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
  // return
  // - words (array)
  // - messages
  // - number of characters (int)
  // - emojis (array of objects)
  // - domains (array)
  // - keywords
}
