const plugin = {
    init: async (bot) => {
        this.bot = bot;
        // Post a message, connect to a database, etc
    },
    handleMessage: (message) => {
        const { trimmedText, fromUser, fromChannel } = message;

	// REMOVED

    }
}

module.exports = plugin;