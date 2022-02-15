//Magic 8-Ball Plugin.

//Begin Long Array Of Responses(TM)

const eightBall = [
        "As I see it, yes",
        "It is certain",
        "It is decidedly so",
        "Most likely",
        "Outlook good",
        "Signs point to yes",
        "Without a doubt",
        "Yes",
        "Yes - definitely",
        "You may rely on it",
        "Reply hazy, try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ];

const plugin = {
    init: async (bot) => {
        this.bot = bot;
        // Post a message, connect to a database, etc
    },
    handleMessage: (message) => {
      const {trimmedText, fromUser, fromChannel} = message;
        if(trimmedText.toLowerCase().startsWith("8ball ")){
            let x = Math.floor(Math.random() * eightBall.length);
            this.bot.postMessage(fromChannel, `<@${fromUser}> ${eightBall[x]}`);        
        }
        if(trimmedText.toLowerCase().startsWith("8 ball ")){
            this.bot.postMessage(fromChannel, `<@${fromUser}> Concantenate and ask again.`);
        }
    }
}

module.exports = plugin;