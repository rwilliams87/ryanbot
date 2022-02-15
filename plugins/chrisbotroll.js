const plugin = {
    init: async (bot) => {
        this.bot = bot;
        // Post a message, connect to a database, etc
    },
    handleMessage: (message) => {
        const {trimmedText, fromUser, fromChannel, rawText} = message;
        if (trimmedText.toLowerCase().startsWith("roll ") && fromUser !== "U01USJF5PFA") {
            var split = trimmedText.split(" ");
            split.shift();
            const dice = split.join(" ");
            this.bot.postMessage(fromChannel, `<@U01USJF5PFA> roll ${dice}`);
        }
    }
}

module.exports = plugin;