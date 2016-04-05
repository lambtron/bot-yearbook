
/**
 * Module dependencies.
 */

var thunkify = require('./util').thunkify;
var storage = thunkify(require('./storage')());
// var Keywords = require('./keywords');
var co = require('co');

/**
 * When a new message is sent.
 */

exports.newMessage = function *newMessage(bot, message) {
  var load = parse(message.text);
  var res = yield storage.users.get(message.user);

  if (!res || res.length === 0) {
    res = [{
      id: message.user,
      messages: {
        timecreated: new Date(),
        words: 0,
        messages: 0,
        characters: 0,
        emojis: {},
        reactions: {},
        keywords: {},
        domains: {}
      }
    }];
  }

  var user = res[0];

  user.messages.words += load.numWords;
  user.messages.messages += load.numMessages;
  user.messages.characters += load.numCharacters;
  user.messages.emojis = merge(user.messages.emojis, load.emojis);
  user.messages.keywords = merge(user.messages.keywords, load.keywords);
  user.messages.domains = merge(user.messages.domains, load.domains);

  return yield storage.users.save(user);
};

/**
 * When a new emoji is added.
 */

exports.newReaction = function *newReaction(bot, message) {
  var userReceiveReaction = message.item_user,
      emojiRef = message.reaction,
      user,
      newReaction = {},
      res = yield storage.users.get(userReceiveReaction);

  user = res[0];
  newReaction[':' + emojiRef] = 1

  user.messages.reactions = merge(user.messages.reactions, newReaction);

  return yield storage.users.save(user);
};


/**
* A mini daily leaderboard of usages
*/

exports.roundUp = function *dailyLeaderboard(bot, message) {
  if(message.text.split(" ")[0].toLowerCase() === "roundup") {
    var allUsers = yield storage.users.all(),
        botResponse = roundUpResponse(allUsers);

    bot.reply(message,{
      text: botResponse,
      icon_emoji: ":robot_face:",
    });
  }
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
  if (!emojis) return ret;
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
  var re = /\<(.*?)\|/g;    // TODO: fix this regex.
  var domains = message.match(re);
  if (!domains) return ret;
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

/**
 * Create formatted user response
 */

function roundUpResponse(users) {
  var userTemplate; 
  // var userHeader = `User ${id} stats:\n`,
  //     userTextState = `${textcount} ${text} has been written\n`,
  //     userEmoji = `${emoji} has been repeated ${emojicount}\n`;

  for(var i = 0; i < users.length; i++) {
    var userId = users[i].id || "undefined",
        wordCount = users[i].messages ? users[i].messages.words : "undefined",
        charCount = users[i].messages ? users[i].messages.characters : "undefined";
    userTemplate += "User "+userId+" stats:\n"+wordCount+" words and "+charCount+" characters have been typed\n"

    if((users[i].messages) && (users[i].messages.emojis)) {
      var emojiObj = users[i].messages.emojis;
      for(key in emojiObj) {
        userTemplate += key+" has been used "+emojiObj[key]+" times!\n"
      }
    }

    userTemplate += "\n"
  }
  
  return userTemplate;

}