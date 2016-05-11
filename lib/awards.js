
/**
 * Module dependencies.
 */

// this is going to have the logic involved in having the awards. what the name of the award is, what the logic is.
// maybe the awards should just be a yaml file??
// every week, we run a few queries on the database.
// we get the top results. we filter it through the yaml file
// then of the remainder, we select the top 5 (define: 'top')
// then we broadcast that to the main channel.

module.exports = Award;

function Award(options) {
  if (!(this instanceof Award)) return new Award(options);
  this.awards = []; // global
  // { 'Andy': 'Poopiest poop', 'Etan': 'Derpiest' }

}

Award.prototype.runAllAwardFunctions = function(users) {
  //run all dem award functions
};

Award.poopiestpoop = function(user) {
  // if user meets conditions
  // add user to array
  var maxPoopReaction = 0;
  var maxPoopReactionUserId = '';

  if (user.messages.reactions && users.messages.reactions[':hankey:'] && user.messages.reactions[':hankey:'] > maxPoopReaction) {
    maxPoopReaction = users.messages.reactions[':hankey:'];
    maxPoopReactionUserId = users.id;
  }

  // if (maxPoopReactionUserId) userTemplate += fmt('<@%s>: %s\n', maxPoopReactionUserId, 'The Poopiest Poop Award');

  this.awards.push();
};

Award.derpiest = function(user) {
  // if user meets conditions
  // add user to array
  this.awards.push();
};

Award.topFive = function() {
  // Return random five dedup'd in the this.awards
}

// chat.js
//
// var award = Award();
// award