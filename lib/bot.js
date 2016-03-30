
/**
 * Module dependencies.
 */

var thunkify = require('./util').thunkify;
var co = require('co');

/**
 * Setup `_bots`
 */

var _bots = {};

/**
 * Create a bot.
 */

exports.createBot = function createBot(bot, config) {
  // Thunkify the api.
  bot.api = thunkify(bot.api);

  // If already configured, leave.
  if (_bots[bot.config.token]) return;

  // Otherwise, start RTM.
  bot.startRTM(co.wrap(function *(err) {
    if (err) return err;
    trackBot(bot);

    /**
     * Add team to database.
     */

    var team = {
      id: bot.team_info.id,
      domain: bot.team_info.domain,
      email_domain: bot.team_info.email_domain,
      feed_id: ''
    };
    yield controller.storage.teams.save(team);

    /**
     * Analytics.
     */

    // analytics.identify({
    //   userId: config.createdBy,
    //   traits: {
    //     team_id: bot.config[0].id,
    //     domain: bot.config[0].domain,
    //     email_domain: bot.config[0].email_domain
    //   }
    // });

    // analytics.track({
    //   userId: config.createdBy,
    //   event: 'Bot Installed'
    // });

    /**
     * Initial conversation with bot's creator.
     */

    bot.startPrivateConversation({ user: config.createdBy }, co.wrap(function *(err, convo) {
      if (err) return console.log(err);
      console.log('CONNECTED!');
      // Conversation here.
    }));
  }));
};

/**
 * RTM open.
 */

exports.rtmOpen = function rtmOpen(bot) {
  console.log('** The RTM api just connected!');
};

/**
 * RTM close.
 */

exports.rtmClose = function rtmClose(bot) {
  console.log('** the RTM api just disconnected!');
  // You may want to attempt to reconnect.
};

/**
 * Connect all bots.
 */

exports.connectAll = function connectAll(err, teams) {
  if (err) throw new Error(err);
  for (var t in teams) {
    if (teams[t].bot) {
      var bot = controller.spawn(teams[t]).startRTM(function(err) {
        if (err) return console.log('Error connecting bot to Slack: ', err);
        trackBot(bot);
      });
    }
  }
}

/**
 * Helper function to initialize a bot.
 */

function trackBot(bot) {
  _bots[bot.config.token] = bot;
};
