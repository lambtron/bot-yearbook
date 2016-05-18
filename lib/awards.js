
/**
 * Module dependencies.
 */

// this is going to have the logic involved in having the awards. what the name of the award is, what the logic is.
// maybe the awards should just be a yaml file??
// every week, we run a few queries on the database.
// we get the top results. we filter it through the yaml file
// then of the remainder, we select the top 5 (define: 'top')
// then we broadcast that to the main channel.
var thunkify = require('./util').thunkify;
var storage = thunkify(require('./storage')());
var co = require('co');
var fmt = require('node-fmt');

module.exports = Award;

function Award(options) {
  if (!(this instanceof Award)) return new Award(options);

}

Award.prototype.runAllAwardFunctions = function(users) {
  //run all dem award functions
  this.awards = []; //Used in each function like: this().awards.push("example garbage")
  this.currentStats = {}; //Used in each function like: this().currentStats[prop] = value

  for (var property in Award) {
    if (Award.hasOwnProperty(property)) {
      Award[property](users)
      console.log(this.awards)
    }
  }
};

Award.testAwardOne = function(users) {
  var maxWords = 0;
  var maxWordsUserId = '';

  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id != undefined) {
      if (user.messages.words > maxWords) {
        maxWords = user.messages.words;
        maxWordsUserId = user.id;
      }
    }
  }

  this().awards.push([maxWordsUserId, 'The Wordiest Word Award with: ' + maxWords + ' words!'])
}

Award.testAwardTwo = function(users) {
  var maxFuckOff = 0;
  var maxFuckOffId= '';


  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id != undefined) {
      if (user.messages.emojis && user.messages.emojis[':fu:'] && user.messages.emojis[':fu:'] > maxFuckOff) {
        maxFuckOff = user.messages.emojis[':fu:'];
        maxFuckOffId = user.id;
      }
    }
  }

  this().awards.push([maxFuckOffId, 'The Most Aggressive Person with: ' + maxFuckOff + ' tantrums!'])
}

// Award.poopiestpoop = function(user) {
//   // if user meets conditions
//   // add user to array




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