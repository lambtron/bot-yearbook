
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
    }
  }

  return this.awards;
};

Award.testAwardOne = function(users) {
  var maxWords = 0;
  var maxWordsUserId = '';

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

  this().awards.push([maxWordsUserId, 'Wordiest Word Award with: ' + maxWords + ' words!'])
}

Award.testAwardTwo = function(users) {
  var maxFuckOff = 0;
  var maxFuckOffId= '';


  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id) {
      if (user.messages.emojis && user.messages.emojis[':fu:'] && user.messages.emojis[':fu:'] > maxFuckOff) {
        maxFuckOff = user.messages.emojis[':fu:'];
        maxFuckOffId = user.id;
      }
    }
  }

  this().awards.push([maxFuckOffId, 'Most Aggressive Person with: ' + maxFuckOff + ' tantrums!'])
}

Award.testAwardThree = function(users) {
  var maxGay = 0;
  var maxGayId= '';


  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id) {
      if (user.messages.emojis && user.messages.emojis[':pride:'] && user.messages.emojis[':pride:'] > maxGay) {
        maxGay = user.messages.emojis[':pride:'];
        maxGayId = user.id;
      }
    }
  }

  this().awards.push([maxGayId, 'Most Gay Person Award with: ' + maxGay + ' dicks in and around their butthole!'])
}

Award.testAwardFour = function(users) {
  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id) {
      if (user.messages.emojis && user.messages.emojis[':heart:'] && user.messages.emojis[':yellow_heart:'] && user.messages.emojis[':green_heart:'] && user.messages.emojis[':blue_heart:'] && user.messages.emojis[':purple_heart:']) {
        this().awards.push([user.id, 'Taste The Rainbow Award!'])
      }
    }
  }
}