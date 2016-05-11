
# bot-yearbook

> Superlatives slack bot.

https://paper.dropbox.com/doc/Senior-Superlatives-Name-TBD-eEmoBWix7o2JwQ4ktV9v5

## Running Locally

1. Run `mongod`
2. Run `make`
3. Point your browser to `localhost:3000`

## Development

- ./lib/update.js: listens for updates via Slack's RTM API, parses all new info, and then saves it into the database. [More info about Slack's RTM API](https://api.slack.com/events)


