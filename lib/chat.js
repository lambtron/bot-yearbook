
/**
 * Module dependencies.
 */

var thunkify = require('./util').thunkify;
var storage = thunkify(require('./storage')());
var fmt = require('node-fmt');
var co = require('co');
var Award = require('./awards.js')

/**
* A mini daily leaderboard of usages
*/

exports.roundUp = function *roundUp(bot, message) {
  if(message.text.split(" ")[0].toLowerCase() === "roundup") {
    var users = yield storage.users.all();

    getAwards(users);

    // bot.reply(message, {
    //     text: "Fuck you.",
    //     icon_emoji: ":robot_face:",
    // });
  }
};

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


function getAwards(users) {
  Award.prototype.runAllAwardFunctions(users);

  // var maxPoopReaction = 0;
  // var maxPoopReactionUserId = '';
  // var maxWords = 0;
  // var maxWordsUserId = '';
  // var userTemplate = '';

  // for(var i = 0; i < users.length; i++) {
  //   if (!users[i].messages) continue;

  //   // Logic for who wins the poopiest award.
  //   if (users[i].messages.reactions && users[i].messages.reactions[':hankey:'] && users[i].messages.reactions[':hankey:'] > maxPoopReaction) {
  //     maxPoopReaction = users[i].messages.reactions[':hankey:'];
  //     maxPoopReactionUserId = users[i].id;
  //   }

  //   // Logic for who has the most words.
    // if (users[i].messages.words > maxWords) {
    //   maxWords = users[i].messages.words;
    //   maxWordsUserId = users[i].id;
    // }
  // }

  // if (maxPoopReactionUserId) userTemplate += fmt('<@%s>: %s\n', maxPoopReactionUserId, 'The Poopiest Poop Award');
  // if (maxWordsUserId) userTemplate += fmt('<@%s>: %s\n', maxWordsUserId, 'The Wordiest Word Award');
}
