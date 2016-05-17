
/**
 * Module dependencies.
 */

// this is going to have the logic involved in having the awards. what the name of the award is, what the logic is.
// maybe the awards should just be a yaml file??
// every week, we run a few queries on the database.
// we get the top results. we filter it through the yaml file
// then of the remainder, we select the top 5 (define: 'top')
// then we broadcast that to the main channel.
var fmt = require('node-fmt');

module.exports = Award;

function Award(options) {
  if (!(this instanceof Award)) return new Award(options);
  this.awards = []; // global
  this.currentStats = {}; // for tracking awards that are relative to other users
  // { 'Andy': 'Poopiest poop', 'Etan': 'Derpiest' }

}

Award.prototype.runAllAwardFunctions = function(users) {
  //run all dem award functions
  var awardsList;
  for (var property in Award) {
    if (Award.hasOwnProperty(property)) {
      Award[property](users)
    }
  }
};

Award.testAwardOne = function(users) {
  var maxWords = 0;
  var maxWordsUserId = '';
  var userTemplate = '';

  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id) {
      if (user.messages.words > maxWords) {
        maxWords = user.messages.words;
        maxWordsUserId = user.id;
      }
    }

  }
  if (maxWordsUserId) userTemplate += fmt('<@%s>: %s\n', maxWordsUserId, 'The Wordiest Word Award with: ' + maxWords + ' words!');
  //this.awards.push(USERID, AWARDSTRING);
}

Award.testAwardTwo = function(users) {
  //this.awards.push(USERID, AWARDSTRING);
}

// Award.poopiestpoop = function(user) {
//   // if user meets conditions
//   // add user to array
//   var maxPoopReaction = 0;
//   var maxPoopReactionUserId = '';

//   if (user.messages.reactions && users.messages.reactions[':hankey:'] && user.messages.reactions[':hankey:'] > maxPoopReaction) {
//     maxPoopReaction = users.messages.reactions[':hankey:'];
//     maxPoopReactionUserId = users.id;
//   }

//   // if (maxPoopReactionUserId) userTemplate += fmt('<@%s>: %s\n', maxPoopReactionUserId, 'The Poopiest Poop Award');

//   this.awards.push();
// };

// Award.derpiest = function(user) {
//   // if user meets conditions
//   // add user to array
//   this.awards.push();
// };

Award.topFive = function() {
  // Return random five dedup'd in the this.awards
  var userTemplate = '',
      userAwards = this.awards;
  for(var i = 0; i < userAwards.length; i++) {
    var userAwardID = userAwards[i][0],
        userAward = userAwards[i][1];

    userTemplate += fmt('<@%s>: %s\n', userAwardID, userAward);
  }
  

}

// chat.js
//
// var award = Award();
// award