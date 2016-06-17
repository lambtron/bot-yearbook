
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

Award.awardOne = function(users) {
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

Award.awardTwo = function(users) {
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

Award.awardThree = function(users) {
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

Award.awardFour = function(users) {
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

Award.awardFive = function(users) {
  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id && user.messages.emojis) {
      var sportsCounter = 0;
      for(var key in user.messages.emojis) {
        if(user.messages.emojis[key] === ':bicyclist:' || user.messages.emojis[key] === ':mountain_bicyclist:' || user.messages.emojis[key] === ':football:' || user.messages.emojis[key] === ':tennis:' || user.messages.emojis[key] === ':golf:' || user.messages.emojis[key] ===  ':basketball:' || user.messages.emojis[key] ===  ':swimmer:' || user.messages.emojis[key] ===  ':surfer:' || user.messages.emojis[key] ===  ':soccer:' || user.messages.emojis[key] ===  ':baseball:' || user.messages.emojis[key] ===  ':ski:' || user.messages.emojis[key] ===  ':snowboarder:') {
          sportsCounter++
        }
      }
      if (sportsCounter > 3) {
        this().awards.push([user.id, 'Triathlete award!'])
      }
    }
  }
}

Award.awardSix = function(users) {
  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id && user.messages.emojis) {
      var fatCounter = 0;
      for(var key in user.messages.emojis) {
        if(user.messages.emojis[key] === ':fries:' || user.messages.emojis[key] === ':hamburger:' || user.messages.emojis[key] === ':poultry_leg:' || user.messages.emojis[key] === ':pizza:' || user.messages.emojis[key] === ':meat_on_bone:' || user.messages.emojis[key] ===  ':doughnut:' || user.messages.emojis[key] ===  ':cookie:' || user.messages.emojis[key] ===  ':ice_cream:' || user.messages.emojis[key] ===  ':icecream:' || user.messages.emojis[key] ===  ':custard:' || user.messages.emojis[key] ===  ':chocolate_bar:' || user.messages.emojis[key] ===  ':cake:') {
          fatCounter++
        }
      }
      if (fatCounter > 3) {
        this().awards.push([user.id, 'Fatass award! Might want to think about yoga.'])
      }
    }
  }
}

Award.awardSeven = function(users) {
  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id && user.messages.emojis) {
      var healthyCounter = 0;
      for(var key in user.messages.emojis) {
        if(user.messages.emojis[key] === ':apple:' || user.messages.emojis[key] === ':green_apple:' || user.messages.emojis[key] === ':pear:' || user.messages.emojis[key] === ':tomato:' || user.messages.emojis[key] === ':eggplant:' || user.messages.emojis[key] ===  ':banana:' || user.messages.emojis[key] ===  ':watermelon:' || user.messages.emojis[key] ===  ':melon:' || user.messages.emojis[key] ===  ':grapes:' || user.messages.emojis[key] ===  ':peach:' || user.messages.emojis[key] ===  ':strawberry:' || user.messages.emojis[key] ===  ':tangerine:' || user.messages.emojis[key] === ':sweet_potato:') {
          healthyCounter++
        }
      }
      if (healthyCounter > 3) {
        this().awards.push([user.id, 'Healthy award! Everyone probably hates you and your bod.'])
      }
    }
  }
}

Award.awardEight = function(users) {
  for(var i = 0; i < users.length; i++) {
    var user = users[i];
  //Stopgap for the database producing retarded objects issue
    if(user.id) {
      if (user.messages.emojis && user.messages.emojis[':see_no_evil:'] && user.messages.emojis[':hear_no_evil:'] && user.messages.emojis[':speak_no_evil:']) {
        this().awards.push([user.id, 'Three Wise Monkeys Award!'])
      }
    }
  }
}

Award.awardNine = function(users) {
  for(var i = 0; i < users.length; i++) {
    var user = users[i];
//Stopgap for the database producing retarded objects issue
    if(user.id && user.messages.emojis) {
      var animalCounter = 0;
      for(var key in user.messages.emojis) {
        if(user.messages.emojis[key] === ':cat:' || user.messages.emojis[key] === ':dog:' || user.messages.emojis[key] === ':mouse:' || user.messages.emojis[key] === ':hamster:' || user.messages.emojis[key] === ':rabbit:' || user.messages.emojis[key] ===  ':wolf:' || user.messages.emojis[key] ===  ':frog:' || user.messages.emojis[key] ===  ':pig:' || user.messages.emojis[key] ===  ':bear:' || user.messages.emojis[key] ===  ':boar:' || user.messages.emojis[key] ===  ':cow:' || user.messages.emojis[key] ===  ':tiger:' || user.messages.emojis[key] === ':koala:' || user.messages.emojis[key] ===  ':horse:' || user.messages.emojis[key] ===  ':monkey:') {
          animalCounter++
        }
      }
      if (animalCounter > 3) {
        this().awards.push([user.id, 'Dr. Dolittle Award! You are such a cute animal lover.'])
      }
    }
  }
}