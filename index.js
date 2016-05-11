
/**
 * Module dependencies.
 */

var thunkify = require('./lib/util').thunkify;
var storage = require('./lib/storage');
var update = require('./lib/update');
var chat = require('./lib/chat');
var Botkit = require('botkit');
var bot = require('./lib/bot');
var fmt = require('node-fmt');
var _ = require('lodash');
var url = require('url');
var co = require('co');

/**
 * Assign environmental variables.
 */

var clientId = process.env.clientId || '4292025120.29683610067';
var clientSecret = process.env.clientSecret || '9ae6aa0b82ea11c49ee3fb371908b0e3';
var port = process.env.PORT || 3000;
if (!clientId || !clientSecret || !port) {
  console.log('Error: clientId, clientSecret, and port are undefined in environment');
  process.exit(1);
}

/**
 * Configure the controller.
 */

var controller = Botkit.slackbot({
  storage: thunkify(storage())
}).configureSlackApp({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: 'http://localhost:3000/oauth',
  scopes: ['bot']
});

/**
 * Setup web server.
 */

controller.setupWebserver(port, function(err, webserver) {

  // Landing page.
  webserver.get('/', function(req, res) {
    res.sendFile('./client/index.html', { root: __dirname });
  });

  controller.createWebhookEndpoints(controller.webserver);
  controller.createOauthEndpoints(controller.webserver, function(err, req, res) {
    if (err) return res.status(500).send('ERROR: ' + err);
    res.sendFile('./client/success.html', { root: __dirname });
  });
});

/**
 * Create bots.
 */

controller.on('create_bot', bot.createBot);

/**
 * Open connection.
 */

controller.on('rtm_open', bot.rtmOpen);

/**
 * Close connection.
 */

controller.on('rtm_close', bot.rtmClose);

/**
 * Connect all bots.
 */

controller.storage.teams.all(bot.connectAll);

/**
 * Listens for ambient messages.
 */

controller.on('ambient', co.wrap(update.newMessage));

/**
 * Listens for new reactions.
 */

controller.on('reaction_added', co.wrap(update.newReaction));

/**
* Is summoned when a user mentions the bot and says leaderboard
*/

controller.on('direct_mention', co.wrap(chat.roundUp));
