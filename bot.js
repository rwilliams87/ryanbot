const SlackBot = require('@retsoksirhc/slackbot');
const PingPlugin = require('./plugins/ping');
const Magic8Ball = require('./plugins/magic8Ball');
const SlackApi = require('./plugins/slackapi');
const ChrisBotRoll = require('./plugins/chrisbotroll');
const Toast = require('./plugins/toast');
const wx = require('./plugins/weather.js');
const Flights = require('./plugins/flights.js');
const Test = require('./plugins/test.js');
const Daily = require('./plugins/daily.js');
const Hourly = require('./plugins/hourly.js');

SlackBot.start({
    serverPort: 8080,
    requestPath: "/slack-events",
    botVerificationToken: "[TOKEN REDACTED]",
    botUserOAuthToken: "[OAUTH REDACTED]",
    botAppId: "[APP ID REDACTED]",
    plugins: [PingPlugin, Magic8Ball, SlackApi, ChrisBotRoll, Toast, wx, Flights, Test, Daily, Hourly]
}).then((asdf) => {
    console.log('Bot started');
});