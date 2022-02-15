// String Math!
var stringMath = require('string-math');


const plugin = {
    init: async (bot) => {
        this.bot = bot;
        // Post a message, connect to a database, etc
    },
    handleMessage: (message) => {
        const { trimmedText, fromUser, fromChannel } = message;
        //Do Stuff Here.
        if(trimmedText.toLowerCase().startsWith("math ")){
            const split = trimmedText.split(" ");
            const command = split.slice();
            split.shift();
            const mathQuery = split.join(" ");
            const result = stringMath(mathQuery);
            this.bot.postMessage(fromChannel, `<@${fromUser}> ${result}`);
        }
    }
}

module.exports = plugin;